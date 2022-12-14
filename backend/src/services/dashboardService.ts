import { Op } from "sequelize";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";
import User from "../database/models/User";
import {
  ICommonReturnFromService,
  IGetDataReturn,
  TransactionWithAssociations,
  UserObj,
} from "../interfaces";
import { statusCodes } from "../utils/config";
import sequelize from "../database/models";

export const getData = async (user: UserObj): Promise<IGetDataReturn> => {
  // 1. Find user account details
  const account = await Account.findOne({
    where: { id: user.accountId },
  });

  // 2. Find user transactions details
  const transactions = (await Transaction.findAll({
    where: {
      [Op.or]: [
        {
          debitedAccountId: user.accountId,
        },
        {
          creditedAccountId: user.accountId,
        },
      ],
    },
    include: [
      {
        model: Account,
        attributes: ["id"],
        as: "debitedAccount",
        include: [{ model: User, as: "user", attributes: ["username"] }],
      },
      {
        model: Account,
        attributes: ["id"],
        as: "creditedAccount",
        include: [{ model: User, as: "user", attributes: ["username"] }],
      },
    ],
  })) as TransactionWithAssociations[];

  // 3. Return data to controller
  return {
    account,
    transactions,
    user: { id: user.id, username: user.username, accountId: user.accountId },
  };
};

export const transferMoney = async (
  user: UserObj,
  creditedAccountUsername: string,
  value: number
): Promise<ICommonReturnFromService> => {
  // 1.Check if the credited and debited accounts are not the same:
  if (user.username === creditedAccountUsername)
    return {
      error: {
        name: "Invalid operation",
        message: "Not allowed to make transfer to yourself",
      },
      status: statusCodes.BAD_REQUEST,
    };

  // 2. Check if account to be credited exist:
  const findCreditedAccount = await User.findOne({
    where: { username: creditedAccountUsername },
  });
  if (findCreditedAccount === null)
    return {
      error: {
        name: "Non-existent user",
        message: "Not allowed to make a transfer to a non-existent account",
      },
      status: statusCodes.BAD_REQUEST,
    };

  // 3. Check if debited account exixst and has enougth funds:
  const account = await Account.findOne({ where: { id: user.accountId } });
  if (account === null)
    return {
      error: {
        name: "Internal error",
        message:
          "Your account has not been found. Try again or call to your account manager",
      },
      status: statusCodes.BAD_REQUEST,
    };
  if (value > account.balance)
    return {
      error: {
        name: "Invalid operation",
        message: "You do not have enought funds to perform this operation",
      },
      status: statusCodes.BAD_REQUEST,
    };

  // 4. Start a managed transaction to perform the transfer operation
  try {
    await sequelize.transaction(async (t) => {
      await Transaction.create(
        {
          debitedAccountId: user.accountId,
          creditedAccountId: findCreditedAccount.accountId,
          value,
          createdAt: Date.now(),
        },
        { transaction: t }
      );

      await Account.decrement(
        { balance: value },
        { where: { id: user.accountId }, transaction: t }
      );

      await Account.increment(
        { balance: value },
        { where: { id: findCreditedAccount.accountId }, transaction: t }
      );
    });
    // Return correct status code to dashboardController
    return { error: undefined, status: statusCodes.CREATED };
  } catch (err) {
    // In case of failure, return error and status code accordingly
    const error = err as Error;
    return {
      error: { name: error.name, message: error.message },
      status: statusCodes.INTERNAL_ERROR,
    };
  }
};

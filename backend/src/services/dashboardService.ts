import { Op } from "sequelize";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";
import User from "../database/models/User";
import {
  ICommonReturnFromService,
  IGetDataReturn,
  UserObj,
} from "../interfaces";
import { statusCodes } from "../utils/config";
import sequelize from "../database/models";

export const getData = async (user: UserObj): Promise<IGetDataReturn> => {
  const account = await Account.findOne({
    where: { id: user.accountId },
  });

  const transactions = await Transaction.findAll({
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
  });
  // const data = await sequelize.query(
  //   'SELECT * FROM users u INNER JOIN accounts a ON u."accountId" = a.id INNER JOIN transactions t ON t."debitedAccountId" = a.id OR t."creditedAccountId" = a.id GROUP BY u.id',
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );
  // console.log(data);

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
    const result = await sequelize.transaction(async (t) => {
      const transaction = await Transaction.create(
        {
          debitedAccountId: user.accountId,
          creditedAccountId: findCreditedAccount.accountId,
          value,
          createdAt: Date.now(),
        },
        { transaction: t }
      );

      const debitedAccount = await Account.decrement(
        { balance: value },
        { where: { id: user.accountId }, transaction: t }
      );

      const creditedAccount = await Account.increment(
        { balance: value },
        { where: { id: findCreditedAccount.accountId }, transaction: t }
      );

      return { transaction, debitedAccount, creditedAccount };
    });
    console.log(result);
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

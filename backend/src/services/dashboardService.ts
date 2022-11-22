import { Op } from "sequelize";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";
import { IGetDataReturn, UserObj } from "../interfaces";

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

  return {
    account,
    transactions,
    user: { id: user.id, username: user.username, accountId: user.accountId },
  };
};

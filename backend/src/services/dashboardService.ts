import { Op } from "sequelize";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";
import { IGetDataReturn, UserObj } from "../interfaces";
// import sequelize from "../database/models";

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

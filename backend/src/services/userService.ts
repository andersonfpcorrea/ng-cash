import { QueryTypes } from "sequelize";
import sequelize from "../database/models";
import Account from "../database/models/Account";
import User from "../database/models/User";
import { ICreateUserReturn, IValidSignupBody } from "../interfaces";
import { statusCodes } from "../utils/config";

const createUser = async ({
  username,
  password,
}: IValidSignupBody): Promise<ICreateUserReturn> => {
  const isAlreadyUser = await sequelize.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
  });
  // const isAlreadyUser = await User.findOne({ where: { username } });
  console.log(isAlreadyUser);

  const t = await sequelize.transaction();

  try {
    const account = await Account.create(
      {
        balance: 100,
      },
      { transaction: t }
    );
    console.log(account);

    const user = await User.create(
      {
        username,
        password,
        accountId: account.id,
      },
      { transaction: t }
    );
    console.log(user);

    return {
      user: { id: user.id, username: user.username, accountId: user.accountId },
      status: statusCodes.CREATED,
    };
  } catch (err) {
    console.log(err);
    return { error: err as Error, status: statusCodes.INTERNAL_ERROR };
  }
};

export default { createUser };

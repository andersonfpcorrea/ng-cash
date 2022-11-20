import sequelize from "../database/models";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";
import User from "../database/models/User";
import { ICreateUserReturn, IValidSignupBody } from "../interfaces";
import { statusCodes } from "../utils/config";

const createUser = async ({
  username,
  password,
}: IValidSignupBody): Promise<ICreateUserReturn> => {
  const isAlreadyUser = await User.findOne({
    where: { username },
    raw: true,
  });
  if (isAlreadyUser?.username === username)
    return {
      error: {
        name: "Duplicate username not allowed",
        message: "Username already registered",
      },
      status: statusCodes.BAD_REQUEST,
    };
  console.log(isAlreadyUser);
  console.log(JSON.parse(JSON.stringify(await User.findAll())));
  console.log(JSON.parse(JSON.stringify(await Account.findAll())));
  console.log(JSON.parse(JSON.stringify(await Transaction.findAll())));

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

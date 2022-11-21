import sequelize from "../database/models";
import Account from "../database/models/Account";
import User from "../database/models/User";
import {
  ErrorWithNameAndMessage,
  ICreateAndAuthReturn,
  IisAlreadyUserReturn,
  IValidSignupBody,
} from "../interfaces";
import { statusCodes } from "../utils/config";

const isAlreadyUser = async (
  username: string
): Promise<IisAlreadyUserReturn> => {
  const user = await User.findOne({
    where: { username },
    raw: true,
  });

  return user?.username === username ? { user } : { user: undefined };
};

const createUser = async ({
  username,
  password,
}: IValidSignupBody): Promise<ICreateAndAuthReturn> => {
  // const isAlreadyUser = await User.findOne({
  //   where: { username },
  //   raw: true,
  // });
  // if (isAlreadyUser?.username === username)
  //   return {
  //     error: {
  //       name: "Duplicate username not allowed",
  //       message: "Username already registered",
  //     },
  //     status: statusCodes.BAD_REQUEST,
  //   };
  const { user } = await isAlreadyUser(username);
  if (user === undefined)
    return {
      error: {
        name: "Duplicate username not allowed",
        message: "Username already registered",
      },
      status: statusCodes.BAD_REQUEST,
    };

  try {
    const result = await sequelize.transaction(async (t) => {
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
        user: {
          id: user.id,
          username: user.username,
          accountId: user.accountId,
        },
        status: statusCodes.CREATED,
        message: "Success",
      };
    });
    return result;
  } catch (err) {
    console.log(err);
    return {
      error: err as ErrorWithNameAndMessage,
      status: statusCodes.INTERNAL_ERROR,
    };
  }
};

const login = async ({
  username,
  password,
}: IValidSignupBody): Promise<ICreateAndAuthReturn> => {
  // Check if user is in database:
  const { user } = await isAlreadyUser(username);
  if (user === undefined)
    return {
      error: {
        name: "Username not registered. Signup first",
        message: "Username not registered. Signup first",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  // Check if password is correct
  if (!(await user.isCorrectPassword(password, user.password)))
    return {
      error: {
        name: "Incorrect email or password",
        message: "Incorrect email or password",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  return {
    message: "Success",
    status: statusCodes.OK,
    user,
  };
};

export default { createUser, login };

import sequelize from "../database/models";
import Account from "../database/models/Account";
import User from "../database/models/User";
import {
  // ErrorWithNameAndMessage,
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
  // 1. Check if user already exist in database
  const { user } = await isAlreadyUser(username);
  if (user !== undefined)
    return {
      error: {
        name: "Duplicate username not allowed",
        message: "Username already registered",
      },
      status: statusCodes.BAD_REQUEST,
    };

  // 2. Commence a managed transaction to create a new entry in users and accounts tables
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

      // 3. Return data to login user on authController
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
    return {
      error: err as Error,
      status: statusCodes.INTERNAL_ERROR,
    };
  }
};

const login = async ({
  username,
  password,
}: IValidSignupBody): Promise<ICreateAndAuthReturn> => {
  // 1. Check if user is in database:
  const { user } = await isAlreadyUser(username);
  if (user === undefined)
    return {
      error: {
        name: "Username not registered. Signup first",
        message: "Username not registered. Signup first",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  // 2. Check if password is correct
  if (!(await User.isCorrectPassword(password, user.password)))
    return {
      error: {
        name: "Incorrect email or password",
        message: "Incorrect email or password",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  // 3. Return data to login user on authController
  return {
    message: "Success",
    status: statusCodes.OK,
    user: {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
    },
  };
};

export default { createUser, login };

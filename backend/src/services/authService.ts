import {
  CookieObj,
  ICreateAndAuthReturn,
  RequestWithCookiesAndUser,
} from "../interfaces";
import { statusCodes } from "../utils/config";
import jwt from "jsonwebtoken";
import User from "../database/models/User";

const protect = async (
  req: RequestWithCookiesAndUser
): Promise<ICreateAndAuthReturn> => {
  // Check if token is present in the request
  let token: string | undefined;
  if (req.headers.authorization?.startsWith("Bearer") !== undefined) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt !== undefined) {
    token = req.cookies.jwt;
  }

  // If token is not preset, protected route is not accessed
  if (token === undefined)
    return {
      error: {
        name: "Unauthorized access",
        message: "You are not logged in",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  // If there is a token, it is verifyed
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as CookieObj;

  // Check if the user is in database
  const currentUser = await User.findByPk(decoded.id);
  if (currentUser === null)
    return {
      error: {
        name: "User unknown",
        message: "User no longer exist in database",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  // Return user data to be included into the request body
  return {
    user: {
      id: currentUser.id,
      username: currentUser.username,
      accountId: currentUser.accountId,
    },
    status: 1,
  };
};

export default { protect };

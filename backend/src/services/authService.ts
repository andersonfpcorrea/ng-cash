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

  if (token === undefined)
    return {
      error: {
        name: "Unauthorized access",
        message: "You are not logged in",
      },
      status: statusCodes.UNAUTHORIZED,
    };

  // Token verification
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

  // Allow access to protected route:
  return { user: currentUser, status: 1 };
};

export default { protect };

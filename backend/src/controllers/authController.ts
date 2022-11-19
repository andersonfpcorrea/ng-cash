import { Request, Response } from "express";
import { ISignupBody, IValidSignupBody } from "../interfaces";
import AppError from "../utils/AppError";
import { statusCodes } from "../utils/config";
import { validateSignup } from "../utils/Validator";
import userService from "../services/userService";
import jwt from "jsonwebtoken";

const createToken = (id: number): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const sendCookie = (token: string, res: Response): void => {
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
};

const signup = async (req: Request, res: Response): Promise<void> => {
  if (!validateSignup(req.body as ISignupBody))
    throw new AppError("Username or password missing", statusCodes.BAD_REQUEST);

  const { user, error, status } = await userService.createUser(
    req.body as IValidSignupBody
  );

  if (error !== undefined) throw new AppError(error.message, status);

  const token = createToken(user?.id as number);

  sendCookie(token, res);

  res.status(statusCodes.CREATED).json({
    status: "success",
    token,
    data: {
      user: {
        id: user?.id,
        username: user?.username,
        accountId: user?.accountId,
      },
    },
  });
};

export default { signup };

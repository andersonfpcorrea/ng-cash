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
  // Check if the body object contains username and password
  validateSignup(req.body as ISignupBody);

  // Create user
  const { user, error, status, message } = await userService.createUser(
    req.body as IValidSignupBody
  );
  if (error !== undefined) throw new AppError(error.message, status);

  // Create JWT
  const token = createToken(user?.id as number);

  // Send JWT through cookie to client
  sendCookie(token, res);

  // Response
  res.status(status).json({
    status: message,
    token,
    data: {
      user,
    },
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  // Check if the body object contains username and password
  validateSignup(req.body as ISignupBody);

  // Check if the user exist and password is correct
  const { error, status, message, user } = await userService.login(
    req.body as IValidSignupBody
  );
  if (error !== undefined) throw new AppError(error.message, status);

  // Create JWT
  const token = createToken(user?.id as number);

  // Send JWT through cookie to client
  sendCookie(token, res);

  // Response
  res.status(status).json({ status: message, token, data: { user } });
};

export default { signup, login };

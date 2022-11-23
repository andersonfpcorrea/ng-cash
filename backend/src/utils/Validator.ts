import isStrongPassword from "validator/lib/isStrongPassword";
import { ISignupBody } from "../interfaces";
import AppError from "./AppError";
import { MIN_USERNAME_LENGTH, statusCodes } from "./config";

/**
 * @comments Utility function to validate auth data in login/signup requests
 */
export function validateSignup(reqBody: ISignupBody): void {
  const { username, password } = reqBody;

  if (username === undefined || password === undefined)
    throw new AppError("Username or password missing", statusCodes.BAD_REQUEST);

  if (username.length < MIN_USERNAME_LENGTH)
    throw new AppError(
      "Username must have 3 or more characters",
      statusCodes.BAD_REQUEST
    );

  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
  )
    throw new AppError(
      "Passwords must have min length of 8 characters and must contain at least one uppercase letter and on number",
      statusCodes.BAD_REQUEST
    );
}

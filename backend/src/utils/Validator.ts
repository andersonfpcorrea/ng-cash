import isStrongPassword from "validator/lib/isStrongPassword";
import { ISignupBody, ValidateSignupReturn } from "../interfaces";
import { MIN_USERNAME_LENGTH } from "./config";

export function validateSignup(reqBody: ISignupBody): ValidateSignupReturn {
  const { username, password } = reqBody;
  console.log(password);

  if (username === undefined || password === undefined)
    return { fail: true, message: "Username or password missing" };

  if (username.length < MIN_USERNAME_LENGTH)
    return { fail: true, message: "Username must have 3 or more characters" };

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
    return {
      fail: true,
      message:
        "Passwords must have min length of 8 characters and must contain at least one uppercase letter and on number",
    };

  return { fail: false };
}

import isStrongPassword from "validator/lib/isStrongPassword";
import { ISignupBody } from "../interfaces";
import { MIN_USERNAME_LENGTH } from "./config";

export function validateSignup(reqBody: ISignupBody): boolean {
  const { username, password } = reqBody;
  if (username === undefined || password === undefined) return false;
  if (
    isStrongPassword(password, { minLength: 8, minUppercase: 1, minNumbers: 1 })
  )
    return false;
  if (username.length < MIN_USERNAME_LENGTH) return false;
  return true;
}

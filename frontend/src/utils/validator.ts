import { IUserCredentials, IValidateUserDataReturn } from "../interfaces";
import { MIN_USERNAME_LENGTH } from "./config";
import isStrongPassword from "validator/lib/isStrongPassword";

const USERNAME_ERROR_MESSAGE = "3 or more characters";
const PASSWORD_ERROR_MESSAGE =
  "8+ chars, including one number and one uppercase letter";

const isPasswordCorrect = (password: string): boolean =>
  isStrongPassword(password, {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  });

const validateUserData = ({
  username,
  password,
}: IUserCredentials): IValidateUserDataReturn => {
  if (username.length < MIN_USERNAME_LENGTH && isPasswordCorrect(password))
    return {
      usernameIsWrong: true,
      passwordIsWrong: false,
      messageUser: USERNAME_ERROR_MESSAGE,
      messagePassword: "",
    };
  if (!isPasswordCorrect(password) && username.length >= MIN_USERNAME_LENGTH)
    return {
      passwordIsWrong: true,
      usernameIsWrong: false,
      messagePassword: PASSWORD_ERROR_MESSAGE,
      messageUser: "",
    };
  if (!isPasswordCorrect(password) && username.length < MIN_USERNAME_LENGTH)
    return {
      usernameIsWrong: true,
      passwordIsWrong: true,
      messageUser: USERNAME_ERROR_MESSAGE,
      messagePassword: PASSWORD_ERROR_MESSAGE,
    };

  return {
    usernameIsWrong: false,
    passwordIsWrong: false,
    messagePassword: "",
    messageUser: "",
  };
};

export default { validateUserData };

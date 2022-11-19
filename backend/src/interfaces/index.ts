import User from "../database/models/User";

export interface IAppError extends Error {
  statusCode: number;
  status: "fail" | "error";
}

export interface ISignupBody {
  username?: string;
  password?: string;
}

export interface IValidSignupBody {
  username: string;
  password: string;
}

export interface createUserReturn {
  user?: User;
  status: number;
  error?: Error;
}

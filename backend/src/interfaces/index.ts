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

export interface ICreateAndAuthReturn {
  user?: { id: number; username: string; accountId: number };
  message?: string;
  status: number;
  error?: Error;
}

export interface IisAlreadyUserReturn {
  user?: User;
  notInDB?: boolean;
}

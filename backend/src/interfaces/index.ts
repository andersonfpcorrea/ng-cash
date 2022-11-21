import { Request } from "express";
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

export interface RequestWithCookiesAndUser extends Request {
  cookies: { jwt?: string };
  user?: {
    id: number;
    username: string;
    accountId: number;
  };
}

export interface CookieObj {
  id: string;
  iat: number;
  exp: number;
}

export interface ErrorWithNameAndMessage extends Error {
  message: string;
  name: string;
}

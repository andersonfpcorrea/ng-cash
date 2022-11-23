import { Request } from "express";
import Account from "../database/models/Account";
import Transaction from "../database/models/Transaction";
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

export interface ICommonReturnFromService {
  message?: string;
  status: number;
  error?: Error;
}

export interface ICreateAndAuthReturn extends ICommonReturnFromService {
  user?: { id: number; username: string; accountId: number };
}

export interface IisAlreadyUserReturn {
  user?: User;
  notInDB?: boolean;
}

export interface UserObj {
  id: number;
  username: string;
  accountId: number;
}

export interface RequestWithCookiesAndUser extends Request {
  cookies: { jwt?: string };
  user?: UserObj;
}

export interface RequestForTransfers extends RequestWithCookiesAndUser {
  body: {
    creditedAccountUsername: string;
    value: number;
  };
}

export interface CookieObj {
  id: string;
  iat: number;
  exp: number;
}

export interface TransactionWithAssociations extends Transaction {
  debitedAccount: { id: number; user: { username: string } };
  creditedAccount: { id: number; user: { username: string } };
}

export interface IGetDataReturn {
  account: Account | null;
  transactions: TransactionWithAssociations[];
  user: { id: number; username: string; accountId: number };
}

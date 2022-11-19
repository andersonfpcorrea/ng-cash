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

export interface ICreateUserReturn {
  user?: { id: number; username: string; accountId: number };
  status: number;
  error?: Error;
}

export interface ValidateSignupReturn {
  fail: boolean;
  message?: string;
}

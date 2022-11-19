import { NextFunction, Request, Response } from "express";
import { IAppError } from "../interfaces";

export default function (
  err: IAppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.log(err.message);
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

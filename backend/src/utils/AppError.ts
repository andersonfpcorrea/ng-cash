export default class AppError extends Error {
  statusCode: number;
  status: string;
  constructor(messsage: string, statusCode: number) {
    super(messsage);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

import { Response } from "express";
import {
  RequestForTransfers,
  RequestWithCookiesAndUser,
  UserObj,
} from "../interfaces";
import * as dashboardService from "../services/dashboardService";
import AppError from "../utils/AppError";
import { statusCodes } from "../utils/config";

export const getData = async (
  req: RequestWithCookiesAndUser,
  res: Response
): Promise<void> => {
  const { user } = req;

  const result = await dashboardService.getData(user as UserObj);

  res.status(200).json(result);
};

export const transferMoney = async (
  req: RequestForTransfers,
  res: Response
): Promise<void> => {
  // Request body validation:
  const { user } = req;
  if (req.body === undefined)
    throw new AppError(
      "Missing required field to perform transfer",
      statusCodes.BAD_REQUEST
    );

  const { creditedAccountUsername, value } = req.body;

  // Transfering logic:
  const { error, status } = await dashboardService.transferMoney(
    user as UserObj, // user is not "undefined" because that is guaranteed by authController
    creditedAccountUsername,
    value
  );
  if (error !== undefined) throw new AppError(error.message, status);

  // If no error was throuwn, operation is settled and app return updated user data:
  const result = await dashboardService.getData(user as UserObj);

  res.status(status).json(result);
};

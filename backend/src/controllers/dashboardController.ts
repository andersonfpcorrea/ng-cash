import { Response } from "express";
import { RequestWithCookiesAndUser, UserObj } from "../interfaces";
import * as dashboardService from "../services/dashboardService";

export const getData = async (
  req: RequestWithCookiesAndUser,
  res: Response
): Promise<void> => {
  const { user } = req;

  const result = await dashboardService.getData(user as UserObj);

  res.status(200).json({ ...result, user });
};

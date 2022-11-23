import { AxiosResponse } from "axios";
import api from "../config";

export const requestDashboardData = async (
  token: string,
  signal?: AbortSignal
): Promise<AxiosResponse> =>
  await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

export const requestTransfer = async (
  creditedAccountUsername: string,
  value: number,
  token: string
): Promise<AxiosResponse> =>
  await api.post(
    "/dashboard/transfer",
    {
      creditedAccountUsername,
      value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

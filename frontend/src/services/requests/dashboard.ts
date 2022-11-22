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

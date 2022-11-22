import { AxiosResponse } from "axios";
import api from "../config";

export const requestDashboardData = async (): Promise<AxiosResponse> =>
  await api.get("/dashboard");

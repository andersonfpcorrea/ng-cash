import { AxiosResponse } from "axios";
import api from "../config";

export const requestDashboardData = async (
  signal?: AbortSignal
): Promise<AxiosResponse> => await api.get("/dashboard", { signal });

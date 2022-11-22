import { AxiosResponse } from "axios";
import { IUserCredentials } from "../../interfaces";
import api from "../config";

export const requestLogin = async ({
  username,
  password,
}: IUserCredentials): Promise<AxiosResponse> =>
  await api.post("/users/login", {
    username,
    password,
  });

export const requestSignup = async ({
  username,
  password,
}: IUserCredentials): Promise<AxiosResponse> =>
  await api.post("/users/signup", {
    username,
    password,
  });

import { apiClient } from "@/helper/api";

const prefix = "/account";

interface Props {
  username: string;
  password: string;
}

export const loginService = async (data: Props): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/login`, data);

  return res.data;
};

export const authorization = async (): Promise<any> => {
  const res = await apiClient?.get(`${prefix}/me`);

  return res.data;
};

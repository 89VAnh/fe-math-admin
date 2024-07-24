import { Account } from "@/types/Account";
import { apiClient } from "../api";

const prefix = "account";

export const loginFetcher = async (
  payload: { username: string; password: string } | null
) => {
  if (payload)
    return apiClient
      .post(`${prefix}/login`, payload)
      .then((res) => res.data.account);
};

export const searchFetcher = async (payload: {
  page?: number;
  page_size?: number;
}): Promise<Account[]> => {
  try {
    if (payload)
      return apiClient
        .get(`${prefix}/search`, { params: payload })
        .then((res) => res.data);
    return [];
  } catch {
    return [];
  }
};

export const delLoginFetcher = async (username: string) => {
  return apiClient
    .delete(`${prefix}/${username}`)
    .then((res) => res.data.account);
};

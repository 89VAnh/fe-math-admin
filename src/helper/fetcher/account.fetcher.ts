import { Account, SearchAccountResult } from "@/types/Account";
import { apiClient } from "../api";

const prefix = "account";

export const loginFetcher = async (
  payload: { username: string; password: string } | null
) => {
  if (payload)
    return apiClient
      .post(`${prefix}/login/admin`, payload)
      .then((res) => res.data);
};

export const searchAccountFetcher = async (payload: {
  page?: number;
  page_size?: number;
}): Promise<SearchAccountResult> => {
  try {
    if (payload)
      return apiClient
        .get(`${prefix}/search`, { params: payload })
        .then((res) => res.data);
    return { total: 0, data: [] };
  } catch {
    return { total: 0, data: [] };
  }
};

export const delLoginFetcher = async (username: string) => {
  return apiClient
    .delete(`${prefix}/${username}`)
    .then((res) => res.data.account);
};

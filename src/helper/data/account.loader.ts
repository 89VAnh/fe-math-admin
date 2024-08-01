import { SearchAccount } from "@/types/Account";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteFetcher, getFetcher, postFetcher } from "../fetcher";
const prefix = "account";

export function useLogin() {
  const { trigger, error, isMutating } = useSWRMutation(
    `${prefix}/login/admin`,
    postFetcher
  );

  return { trigger, error, isMutating };
}

export function useRegister() {
  const { trigger } = useSWRMutation(`${prefix}/register`, postFetcher);

  return { trigger };
}

export function useSearchAccount(params: any) {
  params = { ...params, name: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [`${prefix}`, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useDeleteAccount() {
  const { trigger, isMutating } = useSWRMutation(`${prefix}`, deleteFetcher);

  return { trigger, isMutating };
}

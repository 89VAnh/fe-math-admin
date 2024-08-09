import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from "../fetcher";

const prefix = "chat";

export function useSearchChat(params: any) {
  params = { ...params, content: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useDeleteChat() {
  const { trigger, isMutating } = useSWRMutation(prefix, deleteFetcher);

  return { trigger, isMutating };
}

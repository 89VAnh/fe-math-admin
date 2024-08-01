import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from "../fetcher";

const prefix = "level";

export function useSearchLevel(params: any) {
  params = { ...params, name: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useDeleteLevel() {
  const { trigger, isMutating } = useSWRMutation(prefix, deleteFetcher);

  return { trigger, isMutating };
}

export function useCreateLevel() {
  const { trigger, isMutating } = useSWRMutation(prefix, postFetcher);

  return { trigger, isMutating };
}

export function useUpdateLevel() {
  const { trigger, isMutating } = useSWRMutation(prefix, putFetcher);

  return { trigger, isMutating };
}

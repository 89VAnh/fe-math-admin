import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from "../fetcher";

const prefix = "test";

export function useSearchTest(params: any) {
  params = { ...params, id: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useDeleteTest() {
  const { trigger, isMutating } = useSWRMutation(prefix, deleteFetcher);

  return { trigger, isMutating };
}

export function useCreateTest() {
  const { trigger, isMutating } = useSWRMutation(prefix, postFetcher);

  return { trigger, isMutating };
}

export function useUpdateTest() {
  const { trigger, isMutating } = useSWRMutation(prefix, putFetcher);

  return { trigger, isMutating };
}

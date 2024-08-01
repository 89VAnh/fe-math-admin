import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from "../fetcher";

const prefix = "question";

export function useSearchQuestion(params: any) {
  params = { ...params, content: params.searchContent };
  delete params.searchContent;
  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useDeleteQuestion() {
  const { trigger, isMutating } = useSWRMutation(prefix, deleteFetcher);

  return { trigger, isMutating };
}

export function useCreateQuestion() {
  const { trigger, isMutating } = useSWRMutation(prefix, postFetcher);

  return { trigger, isMutating };
}

export function useUpdateQuestion() {
  const { trigger, isMutating } = useSWRMutation(prefix, putFetcher);

  return { trigger, isMutating };
}

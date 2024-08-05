import useSWR from "swr";
import { getFetcher } from "../fetcher";

const prefix = "dashboard";

export function useGetDashboard() {
  const { data, isLoading, error, mutate } = useSWR(prefix, getFetcher);

  return { data, isLoading, error, mutate };
}

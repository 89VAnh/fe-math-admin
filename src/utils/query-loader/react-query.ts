import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60 * 1000,
  },
};

function makeQueryClient() {
  return new QueryClient({ defaultOptions: queryConfig });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // supsends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const queryClient = getQueryClient();

export type PromiseValue<
  PromiseType,
  Otherwise = PromiseType
> = PromiseType extends Promise<infer Value>
  ? { 0: PromiseValue<Value>; 1: Value }[PromiseType extends Promise<unknown>
      ? 0
      : 1]
  : Otherwise;

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError<any>,
    Parameters<MutationFnType>[0]
  >;

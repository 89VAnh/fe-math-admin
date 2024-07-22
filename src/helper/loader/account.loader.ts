import { apiClient } from "@/helper/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import useSWR from "swr";

const prefix = "account";

export const useLogin = (data: { username: string; password: string }) => {
  // const cookieStore = cookies();

  // const fetcher = (url: string) =>
  //   apiClient
  //     .post(url, data)
  //     .then((res) => res.data)
  //     .then(
  //       (data) => {
  //         cookieStore.set("user", data);
  //         redirect("/");
  //       },
  //       (error) => error
  //     );

  // return useSWR(prefix + "/login", fetcher);
  const { data, mutate, error } = useSWR("api_user", userFetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
};

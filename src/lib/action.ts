"use server";

import { apiClient } from "@/helper/api";
import { Account } from "@/types/Account";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  const cookieStore = cookies();

  const payload = {
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const account = await apiClient
    .post("/account/login", payload)
    .then((res) => res.data.account)
    .catch(() => {
      throw new Error("Tên tài khoản hoặc mật khẩu không chính xác");
    });

  cookieStore.set("user", JSON.stringify(account));
  cookieStore.set("session_token", account.token);

  redirect("/");
}

export async function getUser(): Promise<Account> {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;

  if (!user) {
    return {} as Account;
  } else return JSON.parse(user) as Account;
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("user");
  cookieStore.delete("session_token");
  redirect("/login");
}

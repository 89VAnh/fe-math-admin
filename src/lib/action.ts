"use server";

import { apiClient } from "@/helper/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(_currentState: unknown, formData: FormData) {
  const cookieStore = cookies();

  const payload = {
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  apiClient
    .post("/account/login", payload)
    .then((res) => res.data.account)
    .then(
      (data) => {
        cookieStore.set("user", data);
        // revalidatePath("/");
        // redirect("/");
        console.log(data);
      },
      (error) => {
        throw error;
      }
    );
}

import { ACCOUNT_URL } from "@/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ACCOUNT_URL);
}

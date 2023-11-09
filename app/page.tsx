import { redirect } from "next/navigation";
import { DEAFULT_PUBLIC_ROUTE } from "../lib/api";

export default function Index() {
  redirect(DEAFULT_PUBLIC_ROUTE);
}

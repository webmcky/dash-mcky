import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
}

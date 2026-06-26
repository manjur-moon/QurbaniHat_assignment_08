import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getCurrentSession() {
  return await auth.api.getSession({
    headers: await headers()
  });
}

export async function requireUser(loginPath = "/login") {
  const session = await getCurrentSession();

  if (!session) {
    redirect(loginPath);
  }

  return session;
}

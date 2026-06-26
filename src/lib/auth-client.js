import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const isGoogleAuthEnabled =
  process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true";
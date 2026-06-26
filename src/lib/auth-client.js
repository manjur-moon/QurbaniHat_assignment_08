import { createAuthClient } from "better-auth/react";

function getClientBaseURL() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const candidates = [
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.BETTER_AUTH_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    "http://localhost:3000"
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    const cleanUrl = candidate.trim().replace(/^["']|["']$/g, "");

    try {
      const url = new URL(cleanUrl);

      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.origin;
      }
    } catch {
      // ignore invalid url
    }
  }

  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getClientBaseURL()
});

export const isGoogleAuthEnabled =
  process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true";
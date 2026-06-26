import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing in environment variables");
}

function normalizeURL(value) {
  if (!value) return null;

  const cleanUrl = value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/;$/, "");

  try {
    const url = new URL(cleanUrl);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.origin;
    }

    return null;
  } catch {
    return null;
  }
}

const baseURL =
  normalizeURL(process.env.BETTER_AUTH_URL) ||
  normalizeURL(process.env.NEXT_PUBLIC_APP_URL) ||
  normalizeURL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  ) ||
  "http://localhost:3000";

const trustedOrigins = [
  baseURL,
  normalizeURL(process.env.NEXT_PUBLIC_APP_URL),
  normalizeURL(process.env.BETTER_AUTH_URL),
  normalizeURL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  ),
  "http://localhost:3000",
  "http://localhost:3001"
].filter(Boolean);

const client = await clientPromise;
const databaseName = process.env.MONGODB_DATABASE || "qurbanihat";
const db = client.db(databaseName);

const googleEnabled =
  process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true" &&
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  appName: "QurbaniHat",

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL,

  trustedOrigins,

  database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8
  },

  socialProviders: googleEnabled
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
      }
    : {},

  plugins: [nextCookies()]
});
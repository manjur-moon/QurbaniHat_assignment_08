import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getMongoClient } from "@/lib/mongodb";
import { getMongoDatabaseName } from "@/lib/mongo-uri";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing in .env.local");
}

const client = await getMongoClient();
const db = client.db(getMongoDatabaseName());

const isGoogleConfigured =
  process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true" &&
  Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  appName: "QurbaniHat",
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    process.env.BETTER_AUTH_URL || "http://localhost:3000"
  ],
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8
  },
  socialProviders: isGoogleConfigured
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          prompt: "select_account"
        }
      }
    : {},
  plugins: [nextCookies()]
});

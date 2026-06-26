import fs from "node:fs";
import path from "node:path";

export function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local not found. Run: npm run setup-env");
  }

  const content = fs.readFileSync(envPath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;

    const key = trimmed.slice(0, equalIndex).trim();
    const value = trimmed.slice(equalIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

export function getMongoDatabaseName() {
  return process.env.MONGODB_DATABASE || "qurbanihat";
}

export function getMongoUri() {
  if (process.env.MONGODB_URI?.trim()) {
    return process.env.MONGODB_URI.trim();
  }

  const username = process.env.MONGODB_USERNAME?.trim();
  const password = process.env.MONGODB_PASSWORD?.trim();
  const clusterHost = process.env.MONGODB_CLUSTER_HOST?.trim();
  const database = getMongoDatabaseName();

  if (!username || !password || !clusterHost) {
    throw new Error(
      "MongoDB env missing. Add MONGODB_USERNAME, MONGODB_PASSWORD, and MONGODB_CLUSTER_HOST in .env.local."
    );
  }

  const safeUsername = encodeURIComponent(username);
  const safePassword = encodeURIComponent(password);
  const cleanHost = clusterHost
    .replace(/^mongodb\+srv:\/\//, "")
    .replace(/^mongodb:\/\//, "")
    .replace(/\/.*/, "");

  return `mongodb+srv://${safeUsername}:${safePassword}@${cleanHost}/${database}?retryWrites=true&w=majority`;
}

export function hideMongoUri(uri) {
  return uri.replace(/:\/\/([^:]+):([^@]+)@/, "://***:***@");
}

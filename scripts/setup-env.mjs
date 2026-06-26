import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

function cleanClusterHost(value) {
  return value
    .trim()
    .replace(/^mongodb\+srv:\/\//, "")
    .replace(/^mongodb:\/\//, "")
    .replace(/\/.*/, "");
}

console.log("\nQurbaniHat Easy Env Setup\n");
console.log("Paste only your MongoDB Atlas database user info. This script will generate .env.local for you.\n");

const username = await rl.question("MongoDB database username: ");
const password = await rl.question("MongoDB database password: ");
const clusterHostInput = await rl.question("MongoDB cluster host, e.g. cluster0.xxxxx.mongodb.net: ");
const databaseInput = await rl.question("Database name [qurbanihat]: ");
const googleInput = await rl.question("Enable Google login now? y/N: ");

let googleClientId = "";
let googleClientSecret = "";
let enableGoogle = "false";

if (googleInput.trim().toLowerCase() === "y") {
  enableGoogle = "true";
  googleClientId = await rl.question("GOOGLE_CLIENT_ID: ");
  googleClientSecret = await rl.question("GOOGLE_CLIENT_SECRET: ");
}

rl.close();

const database = databaseInput.trim() || "qurbanihat";
const clusterHost = cleanClusterHost(clusterHostInput);
const secret = crypto.randomBytes(32).toString("base64url");

const env = `BETTER_AUTH_SECRET=${secret}
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

MONGODB_USERNAME=${username.trim()}
MONGODB_PASSWORD=${password.trim()}
MONGODB_CLUSTER_HOST=${clusterHost}
MONGODB_DATABASE=${database}
MONGODB_URI=

NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=${enableGoogle}
GOOGLE_CLIENT_ID=${googleClientId.trim()}
GOOGLE_CLIENT_SECRET=${googleClientSecret.trim()}
`;

const envPath = path.join(process.cwd(), ".env.local");
fs.writeFileSync(envPath, env);

console.log("\n.env.local created successfully.");
console.log("Next run:");
console.log("  npm run test-db");
console.log("  npm run dev\n");

import { loadEnvLocal, getMongoUri, hideMongoUri } from "./env-utils.mjs";

try {
  loadEnvLocal();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const required = ["BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL"];
let hasError = false;

for (const key of required) {
  const value = process.env[key];

  if (!value || value.includes("replace")) {
    console.error(`❌ ${key} is missing or still placeholder.`);
    hasError = true;
  } else {
    console.log(`✅ ${key} exists`);
  }
}

try {
  const uri = getMongoUri();
  console.log("✅ MongoDB URI can be built");
  console.log(`   ${hideMongoUri(uri)}`);
} catch (error) {
  console.error(`❌ ${error.message}`);
  hasError = true;
}

if (process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true") {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error("❌ Google auth is enabled, but Google credentials are missing.");
    hasError = true;
  } else {
    console.log("✅ Google credentials exist");
  }
} else {
  console.log("ℹ️ Google auth disabled. This is okay.");
}

if (hasError) {
  console.error("\nFix the issues above, then run: npm run check-env\n");
  process.exit(1);
}

console.log("\n✅ Environment format looks ready. Now run: npm run test-db\n");

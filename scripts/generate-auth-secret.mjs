import crypto from "node:crypto";

const secret = crypto.randomBytes(32).toString("base64url");
console.log(secret);
console.log("\nCopy this value into BETTER_AUTH_SECRET in .env.local");

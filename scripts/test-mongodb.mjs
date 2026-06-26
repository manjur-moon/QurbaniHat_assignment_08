import { MongoClient } from "mongodb";
import { loadEnvLocal, getMongoUri, getMongoDatabaseName, hideMongoUri } from "./env-utils.mjs";

try {
  loadEnvLocal();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

let uri;

try {
  uri = getMongoUri();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const dbName = getMongoDatabaseName();
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000
});

console.log("Connecting to MongoDB Atlas...");
console.log(hideMongoUri(uri));

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });

  const db = client.db(dbName);
  const result = await db.collection("connection_test").insertOne({
    app: "QurbaniHat",
    message: "MongoDB connection successful",
    createdAt: new Date()
  });

  console.log("\n✅ MongoDB connected successfully.");
  console.log(`✅ Database: ${dbName}`);
  console.log(`✅ Test document inserted: ${result.insertedId}`);
  console.log("\nNow run: npm run dev\n");
} catch (error) {
  console.error("\n❌ MongoDB connection failed.\n");
  console.error(error.message);
  console.error("\nQuick fixes:");
  console.error("1. Atlas → Network Access → Add IP Address → 0.0.0.0/0 for local testing.");
  console.error("2. Atlas → Database Access → check username/password.");
  console.error("3. Make password simple for testing, e.g. Moon12345678.");
  console.error("4. MONGODB_CLUSTER_HOST should look like cluster0.xxxxx.mongodb.net only.");
  console.error("5. Turn off VPN/proxy temporarily and try again.\n");
  process.exit(1);
} finally {
  await client.close().catch(() => {});
}

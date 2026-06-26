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
      "MongoDB env missing. Add MONGODB_USERNAME, MONGODB_PASSWORD, and MONGODB_CLUSTER_HOST in .env.local, or provide MONGODB_URI."
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

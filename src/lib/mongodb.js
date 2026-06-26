import { MongoClient } from "mongodb";
import { getMongoUri } from "@/lib/mongo-uri";

const uri = getMongoUri();

const options = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 45000
};

const globalForMongo = globalThis;

if (!globalForMongo._qurbanihatMongo) {
  globalForMongo._qurbanihatMongo = {
    client: null,
    promise: null
  };
}

export async function getMongoClient() {
  const cached = globalForMongo._qurbanihatMongo;

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    const client = new MongoClient(uri, options);

    cached.promise = client
      .connect()
      .then((connectedClient) => {
        cached.client = connectedClient;
        return connectedClient;
      })
      .catch((error) => {
        cached.promise = null;
        cached.client = null;
        throw error;
      });
  }

  return cached.promise;
}

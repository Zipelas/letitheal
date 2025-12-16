// lib/mongoose.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = getRequiredEnv('MONGODB_URI');

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing ${key} in environment variables`);
  }
  return value;
}

if (!MONGODB_URI) {
  throw new Error('❌ Missing MONGODB_URI in environment variables');
}

/**
 * Strikt typad interface för vår cache i Node's global-scope.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Lägg cache i globalThis så vi inte skapar multipla connections i dev.
 */
const globalWithMongoose = globalThis as unknown as {
  mongooseCache?: MongooseCache;
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

const cache = globalWithMongoose.mongooseCache;

/**
 * Strikt typad databas-connector
 */
export async function dbConnect(): Promise<Mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        autoIndex: true,
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        cache.promise = null;
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

// Optional helper to disconnect cleanly (useful in tests or scripts)
export async function dbDisconnect(): Promise<void> {
  if (cache.conn) {
    await mongoose.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}

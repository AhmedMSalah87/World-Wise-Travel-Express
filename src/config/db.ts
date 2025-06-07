import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DATABASE_URL as string;
const dbName = process.env.DB_NAME as string;
// function to connect to database and return it to use it in crud operations
export const connectDB = async () => {
  let client;
  let db: Db;
  try {
    client = new MongoClient(uri, {
      tls: true,
    });
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
};

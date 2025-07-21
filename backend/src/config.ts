import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret_dev_key";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/secondbrain";
export const PORT = parseInt(process.env.PORT || "3000", 10);

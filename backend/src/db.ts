import mongoose, { Types } from "mongoose";
import { MONGO_URI } from "./config";

// User schema: unique username, hashed password
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 10 },
  password: { type: String, required: true }
});
export const UserModel = mongoose.model('User', userSchema);

// Tag schema (for tag reuse + pop)
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});
export const TagModel = mongoose.model('Tag', tagSchema);

// Content schema, references user + array of tags (by string for simplicity)
const contentSchema = new mongoose.Schema({
  type: { type: String, enum: ["document", "tweet", "youtube", "link"], required: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  // If you want to use Tag objects:{
  // tags: [{ type: Types.ObjectId, ref: 'Tag' }]
  tags: [{ type: String }]
  ,
  userId: { type: Types.ObjectId, ref: 'User', required: true }
});
export const ContentModel = mongoose.model('Content', contentSchema);

// Shareable Brain link schema (maps share-link hash to user)
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true }
});
export const LinkModel = mongoose.model('Link', linkSchema);

// DB connection
export async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected.");
}

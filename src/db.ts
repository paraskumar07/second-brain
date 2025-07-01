// import mongoose from "mongoose";

import { url } from "inspector";
import mongoose , {model, Schema} from "mongoose";

// Async function to connect to MongoDB
export async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/second-brain");
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    console.error("❌ Error connecting to MongoDB:", e);
    process.exit(1); // Stop the server if DB fails
  }
}



const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export const UserModel =  model("User", UserSchema);

const ty = ["docoment", "tweet", "youtube", "link", "image"];

const contentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    type: {type: String, required: true, enum: ty},
    tags: [{type: String}],
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})
export const ContentModel = model("Content", contentSchema);







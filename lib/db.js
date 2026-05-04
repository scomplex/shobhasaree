import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect("mongodb+srv://mayank20429_db_user:XiDzfUbFsp1y9eZv@cluster0.lccd5qw.mongodb.net/SareeNext");
};
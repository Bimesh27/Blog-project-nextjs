import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI as string;
  if (!MONGODB_URI) {
    throw new Error("Mongo URI is not defined");
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    if (conn) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      throw new Error("MongoDB Connection Failed");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.log(`Error: ${errorMessage}`);
  }
};

export default connectDB;

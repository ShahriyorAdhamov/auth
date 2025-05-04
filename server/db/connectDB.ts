import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    console.log("mongo_uri:", mongoUri);

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};


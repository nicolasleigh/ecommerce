import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Database connected...");
  } catch (error) {
    console.log("Database connection failed: ", error.message);
  }
};

export default dbConnect;

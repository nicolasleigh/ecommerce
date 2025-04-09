import mongoose from "mongoose";

let dsn = process.env.MONGODB_URL!;

if (process.env.NODE_ENV === "production") {
  dsn = process.env.CLOUD_MONGODB_URL!;
}

const dbConnect = async () => {
  try {
    await mongoose.connect(dsn);
    console.log("Database connected...");
  } catch (error) {
    console.log("Database connection failed: ", error.message);
  }
};

export default dbConnect;

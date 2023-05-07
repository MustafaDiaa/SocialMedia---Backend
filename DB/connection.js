import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_LOCAL)
    .then((result) => {
      console.log("DB connected successfully........");
    })
    .catch((err) => {
      console.log("Failed to connect on DB.........", err);
    });
};

export default connectDB;

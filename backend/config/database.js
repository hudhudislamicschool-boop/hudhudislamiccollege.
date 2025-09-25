import mongoose from "mongoose";
import {ENV} from "./test-env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);

    console.log("MongoDB cennected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB:, error");
    process.exit(1); // Status code 1 indicates an error, 0 indicates success
  }
};  

const { default: mongoose } = require("mongoose");

module.exports = {
  MONGODB_URI: 'mongodb+srv://hudhudislamicschool_db_user:eFbw6QiPQahVINCy@cluster0.uosm4al.mongodb.net/hudhud_chat?retryWrites=true&w=majority&appName=Cluster0'
};

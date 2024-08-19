import mongoose from "mongoose";
import { DB } from "../env/env.js";
export const mongoosedb = async () => {  
  try {
    await mongoose.connect(DB);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
} 


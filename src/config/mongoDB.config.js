import mongoose from "mongoose";
import envsConfig from "./envs.config.js";


export const connectDB = async () => {
    try {
        mongoose.connect(envsConfig.DB_LINK)
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("Error connecting to DB: " + error);
    }
}
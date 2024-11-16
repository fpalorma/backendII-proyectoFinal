import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.DB_LINK)
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("Error connecting to DB: "+error);
    }
}
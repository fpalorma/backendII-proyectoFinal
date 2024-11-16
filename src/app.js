import express from "express";
import { connectDB } from "./config/mongoDB.config.js";
import router from "./router/index.router.js";
import { initializerPassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser"
import "dotenv/config.js"



const app = express();
connectDB()
initializerPassport();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser(process.env.SECRET_KEY))

app.use("/api", router);


app.listen(8080,()=>{
    console.log("Server ready on port: http://localhost:" + 8080);
});
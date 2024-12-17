import express from "express";
import { connectDB } from "./config/mongoDB.config.js";
import router from "./router/index.router.js";
import { initializerPassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser"
import envsConfig from "./config/envs.config.js";



const app = express();
connectDB()
initializerPassport();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser(envsConfig.SECRET_KEY))

app.use("/api", router);


app.listen(8080,()=>{
    console.log("Server ready on port: http://localhost:" + 8080);
});
import dotenv from "dotenv";

dotenv.config();

export default {
    DB_LINK: process.env.DB_LINK,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY: process.env.SECRET_KEY

};

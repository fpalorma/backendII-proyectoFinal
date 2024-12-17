import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config.js"

export const createToken = (user)=>{
    const {id, email, role} = user
    const token = jwt.sign({id, email, role}, envsConfig.SECRET_KEY, {expiresIn: "5m"})
    return token
}


export const verifyToken = (token)=>{
    try {
        const decode = jwt.verify(token, envsConfig.SECRET_KEY)
        return decode;
    } catch (error) {
        return null
    }
}
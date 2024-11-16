import jwt from "jsonwebtoken";

export const createToken = (user)=>{
    const {id, email, role} = user
    const token = jwt.sign({id, email, role}, "clave_secreta", {expiresIn: "5m"})
    return token
}


export const verifyToken = (token)=>{
    try {
        const decode = jwt.verify(token, "clave_secreta")
        return decode;
    } catch (error) {
        return null
    }
}
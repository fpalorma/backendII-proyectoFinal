import { request, response } from "express"

export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        console.log("User:", req.user)
        if (!req.user) return res.status(401).json({ status: "error", msg: "Unauthorized" });
        if (req.user.role !== role) return res.status(403).json({ status: "error", msg: "Unauthorized" })
        next()
    }
}
import { Router } from "express";
import { userDao } from "../dao/mongo/user.dao.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js"
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "success", message: "User registered" })
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Internal server error" });
  }
});

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    const token = createToken(req.user)
    res.cookie("token", token, { httpOnly: true })
    res.status(200).json({ status: "success", payload: req.user })
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Internal server error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: "success", msg: "Session closed" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Internal server error" });
  }
});

router.get("/current", passportCall("jwt"), authorization("user"), async (req, res) => {
  try {
    const user = await userDao.getById(req.user.id)
    res.status(200).json({ status: "success", payload: user })

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Internal server error" });
  }
});

router.get("/google", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], session: false }), (req, res) => {
  res.status(200).json({ status: "success", payload: req.user })
});


export default router;

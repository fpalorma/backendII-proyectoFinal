import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { sessionController } from "../controller/session.controller.js";


const router = Router();

router.post("/register", passportCall("register"), sessionController.register);

router.post("/login", passportCall("login"), sessionController.login);

router.get("/logout", sessionController.logout);

router.get("/current", passportCall("jwt"), authorization("user"), sessionController.current);

router.get("/google", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], session: false }), (req, res) => {
  res.status(200).json({ status: "success", payload: req.user })
});


export default router;

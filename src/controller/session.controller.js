import { createToken } from "../utils/jwt.js";
import { userDao } from "../dao/mongo/user.dao.js"
import { UserResponseDto } from "../dto/user.dto.js";

export class SessionController {
  async register(req, res) {
    try {
      res.status(201).json({ status: "success", message: "User registered" })
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Internal server error" });
    }
  }

  async login(req, res) {
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
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).json({ status: "success", msg: "Session closed" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Internal server error" });
    }
  }
  async current(req, res) {
    try {
      const user = await userDao.getById(req.user.id)
      const userDTO = new UserResponseDto(user)
      res.status(200).json({ status: "success", payload: userDTO })
  
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Internal server error" });
    }
  }

}

export const sessionController = new SessionController()
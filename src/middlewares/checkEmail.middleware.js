import { request, response } from "express";
import { userDao } from "../dao/mongo/user.dao.js";

export const checkEmail = async (req = request, res = response, next) => {
  try {
    const { email } = req.body;
    const user = await userDao.getByEmail(email);
    if (user)
      return res
        .status(400)
        .json({
          status: "error",
          msg: `User with mail ${email} already exists`,
        });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Internal server error" });
  }
};

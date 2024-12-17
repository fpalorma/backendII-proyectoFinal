import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { productDao } from "../dao/mongo/product.dao.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { productController } from "../controller/product.controller.js";

const router = Router();
router.use(passportCall("jwt"))
router.get("/", authorization("user"), productController.getAll);

router.get("/:pid",authorization("user"), productController.getById);

router.delete("/:pid", authorization("admin"),productController.deleteOne);

router.put("/:pid",authorization("admin"),productController.update);

router.post("/", authorization("admin"),checkProductData, productController.create);
export default router;

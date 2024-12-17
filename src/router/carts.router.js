import { Router } from "express";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { cartController } from "../controller/cart.controller.js"

const router = Router();
router.use(passportCall("jwt"))

router.post("/", authorization("admin"), cartController.createCart);

router.get("/:cid", authorization("user"), cartController.getCartById);

router.post("/:cid/product/:pid", authorization("user"), cartController.addProductToCart);

router.delete("/:cid/product/:pid", authorization("user"), cartController.deleteProductToCart);

router.put("/:cid/product/:pid", authorization("user"), cartController.updateQuantityProductInCart);

router.delete("/:cid", authorization("admin"), cartController.clearProductsToCart);

router.post("/:cid/purchase", authorization("user"), cartController.purchaseCart);

export default router;

import { Router } from "express";
import { cartDao } from "../dao/mongo/cart.dao.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { productDao } from "../dao/mongo/product.dao.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();
router.use(passportCall("jwt"))
router.post("/", authorization("admin"),async (req, res) => {
  try {
    const cart = await cartDao.create();

    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
});

router.get("/:cid",authorization("user"), async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Cart not found" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
});

router.post("/:cid/product/:pid",authorization("user"), async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Product with id: ${pid} not found` });
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `Cart with id: ${cid} not found` });

    const cartUpdate = await cartDao.addProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
});

router.delete("/:cid/product/:pid",authorization("user"), async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Product with id: ${pid} not found` });
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `Cart with id: ${cid} not found` });

    const cartUpdate = await cartDao.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
});

router.put("/:cid/product/:pid", authorization("user"),async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `Product with id: ${pid} not found` });
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `Cart with id: ${cid} not found` });

    const cartUpdate = await cartDao.updateQuantityProductInCart(cid, pid, Number(quantity));

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
});

router.delete("/:cid", authorization("admin"),async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.clearProductsToCart(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Cart not found" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
});

export default router;

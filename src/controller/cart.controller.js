import { productDao } from "../dao/mongo/product.dao.js";
import { cartService } from "../services/cart.service.js";
import { ticketService } from "../services/ticket.service.js";
import { cartDao } from "../dao/mongo/cart.dao.js"

export class CartController {
    async createCart(req, res) {
        try {
            const cart = await cartService.createCart()

            res.status(201).json({ status: "success", cart });

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Internal server error" });
        }
    }

    async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartDao.getById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Cart not found" });

            res.status(200).json({ status: "success", cart });

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Internal server error" });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const product = await productDao.getById(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `Product with id: ${pid} not found` });
            const cart = await cartDao.getById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: `Cart with id: ${cid} not found` });

            const cartUpdate = await cartService.addProductToCart(cid, pid);

            res.status(200).json({ status: "success", payload: cartUpdate });

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Internal server error" });
        }
    }

    async deleteProductToCart(req, res) {
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
    }

    async updateQuantityProductInCart(req, res) {
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
    }

    async clearProductsToCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartDao.clearProductsToCart(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Cart not found" });

            res.status(200).json({ status: "success", cart });

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Internal server error" });
        }
    }

    async purchaseCart(req, res) {
        try {
            const { cid } = req.params
            const cart = await cartService.getCartById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
            const total = await cartService.purchaseCart(cid)
            if (total == 0) return res.status(400).json({ status: "error", msg: "No hay productos disponibles para la compra" })

            const ticket = await ticketService.create(total, req.user.email)


            res.status(200).json({ status: "success", ticket })

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });

        }
    }
}

export const cartController = new CartController();
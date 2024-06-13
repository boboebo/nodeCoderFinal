import { Router } from "express";
import CartManager from "../manager/cartManager.js";

const router = Router();
const path = "data/cart.json";

const cm = new CartManager(path);

// post create cart
/*
id uuid
products[ {idProd, quantity} ... ]
*/
router.post("/", async (req, res) => {
  try {
    const cartCreated = await cm.createCart();
    res.status(200).json(cartCreated);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get cart by id
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cm.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// post add product by id to cart by id if prod exist increase qty
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    cartUpdated = await cm.updateCart(cid, pid);
    res.status(200).json(cartUpdated);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;

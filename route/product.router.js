import { Router } from "express";
import ProductManager from "../manager/productManager.js";
import { validateProd } from "../middleware/validateProd.js";

const router = Router();
const path = "data/products.json";

const pm = new ProductManager(path);

// get de productos
router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await pm.getProducts(limit);
  res.status(200).json(products);
});

// get producto by id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await pm.getProductById(pid);
  res.status(200).json(product);
});

// post add producto
/* 
  id: uuid
  title str
  desc str
  code str
  price number
  status: true
  stock number
  thumbnails: optional
*/
router.post("/", validateProd, async (req, res) => {
  const product = req.body;
  const productCreated = await pm.createProduct(product);
  res.json(productCreated);
});

// put update product by id
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const prodUpd = await pm.updateProduct(pid, req.body);
  if (!prodUpd) res.status(404).json({ msg: "Error updating prod" });
  res.status(200).json(prodUpd);
});

//delete product by id
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await pm.deleteProductById(pid);
  res.status(200).json(product);
});

export default router;

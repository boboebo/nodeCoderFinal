import fs from "fs";
import { v4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async (limit) => {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        let productObj = [];
        if (limit) {
          productObj = JSON.parse(products).splice(0, limit);
        } else {
          productObj = JSON.parse(products);
        }
        return productObj;
      } else return ["notfound"];
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (pid) => {
    try {
      if (fs.existsSync(this.path)) {
        const products = await this.getProducts();
        const product = products.find((prod) => prod.id == pid);
        return product;
      } else return ["notfound"];
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (prod) => {
    const product = {
      id: v4(),
      status: true,
      ...prod,
    };
    const products = await this.getProducts();
    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return product;
  };

  updateProduct = async (pid, prod) => {
    //get prodById
    const prodById = await this.getProductById(pid);

    //UpdatedProd = update prodById with prod
    prodById.title = prod.title ? prod.title : prodById.title;
    prodById.description = prod.description ? prod.description : prodById.description;
    prodById.code = prod.code ? prod.code : prodById.code;
    prodById.price = prod.price ? prod.price : prodById.price;
    prodById.stock = prod.stock ? prod.stock : prodById.stock;
    prodById.category = prod.category ? prod.category : prodById.category;
    prodById.thumbnails = prod.thumbnails ? prod.thumbnails : prodById.thumbnails;

    const products = await this.getProducts();
    const index = products.findIndex((item) => item.id.toString() === pid);
    products[index] = prodById;

    //update json
    const jsonProducts = JSON.stringify(products, null, 2);
    await fs.promises.writeFile(this.path, jsonProducts);

    return prodById;
  };

  deleteProductById = async (pid) => {
    const prodById = await this.getProductById(pid);
    const products = await this.getProducts();
    const index = products.findIndex((item) => item.id.toString() === pid);
    products.splice(index, 1);
    const jsonProducts = JSON.stringify(products, null, 2);
    await fs.promises.writeFile(this.path, jsonProducts);
  };
}

import fs from "fs";
import { v4 } from "uuid";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  createCart = async () => {
    try {
      const cart = {
        id: v4(),
        products: [],
      };
      const carts = await this.getCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (cid) => {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id == cid);
        return cart;
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  updateCart = async (cid, pid) => {
    try {
      console.log('cid ', cid);
      console.log('pid ', pid);
      const cartById = await this.getCartById(cid);
      var prodIndex = cartById.products
        .map((item) => item.id.toString())
        .indexOf(pid);

      if (prodIndex === -1) {
        cartById.products.push({ id: pid, quantity: 1 });
      } else {
        cartById.products[prodIndex].quantity ++ 
      }

      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(cart => cart.id.toString() === cid.toString());
      carts[cartIndex] = cartById;
      const jsonCarts = JSON.stringify(carts);
      fs.promises.writeFile(this.path, jsonCarts);

      return cartById;
    } catch (error) {
      console.log(error);
    }
  };
}

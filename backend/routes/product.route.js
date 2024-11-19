import express from "express";
const Router = express.Router();

import Product from "../models/product.model.js";
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updatedProduct,
} from "../controlles/product.controller.js";

Router.get("/", getAllProducts);

Router.get("/:id", getProduct);
Router.post("/", createProduct);

Router.put("/:id", updatedProduct);

Router.delete("/:id", deleteProduct);

export default Router;

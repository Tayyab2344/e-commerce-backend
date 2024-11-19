import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `server error ${err.message}` });
  }
};
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: `product not found ${error.message}` });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, image, description, price, rating } = req.body;
    if (!name || !image || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Please add required fields" });
    }
    const newProduct = new Product({
      name,
      description,
      image,
      price,
      rating,
    });
    const saveProduct = await newProduct.save();
    res.status(201).json({ success: true, data: saveProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error adding PRroduct ${error.message}`,
    });
  }
};
export const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "not found" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `sever errror ${err.message}` });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "not found" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "deleted succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `product not found ${error.message}` });
  }
};

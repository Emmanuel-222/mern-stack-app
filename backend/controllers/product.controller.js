import Products from "../models/products.model.js";
import mongoose from "mongoose";

export const createNewProduct = async (req, res) => {
    const product = req.body // help to grab activtiy from the frontend.
    if(!product.name || !product.image || !product.price){
        return res.status(404).json({success: false, message: "All fields are required"})
    }
    const newProduct  = new Products(product)

    try {
        const data = await newProduct.save()
        return res.status(201).json({success: true, data: data, message: "Product added successfully"})
    } catch (error) {
        console.log(`ERROR: ${error}`)
        return res.status(500).json({success: false, message: "We have an issue with our server!"})
    }
}

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Products.find({})
        return res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return res.status(500).json({ success: false, message: "There is an internal server issue."})
    }
}

export const removeProduct = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id. Please put in a valid Id."})
    }
    try {
        await Products.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "Product has been removed"})
    } catch (error) {
        console.log(`ERROR: ${error}`)
        return res.status(500).json({success: false, message: "We have an issue with our server!"})
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id. Please put in a valid Id."})
    }
    try {
        const updatedProduct = await Products.findByIdAndUpdate(id, product, { new: true, })
        return res.status(200).json({ success: true, data: updatedProduct, message: "Product has been updated successfully"})
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return res.status(500).json({ success: false, message: "There is an internal server issue."})
    }
}
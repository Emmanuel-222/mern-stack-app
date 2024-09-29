//we put all of the endpoint here.

import express from 'express';
import { createNewProduct, fetchAllProducts, removeProduct, updateProduct } from '../controllers/product.controller.js';


const router = express.Router();

router.get("/", fetchAllProducts)


router.post("/", createNewProduct);

router.delete("/:id", removeProduct)

router.put("/:id", updateProduct)

export default router;
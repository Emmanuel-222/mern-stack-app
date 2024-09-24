//we put all of the endpoint here.

import express from 'express';
import { createNewProduct, fetchAllProducts, removeProduct } from '../controllers/product.controller.js';


const router = express.Router();

router.get("/", fetchAllProducts)


router.post("/", createNewProduct);

router.delete("/:id", removeProduct)

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id. Please put in a valid Id."})
    }
    try {
        const updatedProduct = await Products.findByIdAndUpdate(id, product, { new: true, })
        return res.status(200).json({ success: true, data: updatedProduct})
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return res.status(500).json({ success: false, message: "There is an internal server issue."})
    }
})

export default router;
import express from "express"
import productModel from "../models/product.js";
import product from "../models/product.js";
const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const products = await productModel.find()
        return res.json({
            msg: "successful get products",
            products: products.map(product => ({
                name: product.name,
                price: product.price,
                id: product._id
            }))
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    try{
        const product = await productModel.findById(id)
        if(!product){
            return res.json({
                msg: "no data"
            })
        }
        return res.json({
            msg: "successful get product",
            product
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

router.post("/", async (req, res) => {
    const {name, price, desc} = req.body
    try{
        const newProduct = new productModel({
            name,
            price,
            desc
        })
        const createProduct = await newProduct.save()
        return res.json({
            msg: "successful create new product",
            product: createProduct
        })

    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

router.delete("/", async (req, res) => {
    try{
        const deleteProduct = await productModel.deleteMany()
        return res.json({
            msg: `successful deleted all data`,
            deleteProduct
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

router.delete("/:id", async(req, res) => {
    const {id} = req.params
    try{
        const deleteOneProduct = await productModel.findByIdAndRemove(id)
        return res.json({
            msg: `successful deleted one order`,
            deleteOneProduct
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const updateOps = {};
        for (const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
        const putProduct = await productModel.findByIdAndUpdate(id, {$set: updateOps})
        return res.json({
            msg: `successfully updated product by ${id}`,
            putProduct
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

export default router
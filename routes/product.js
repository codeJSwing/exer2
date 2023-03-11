import express from "express"
import productModel from "../models/product.js";
const router = express.Router()

router.get("/", (req, res) => {
    productModel
        .find()
        .then(products => {
            res.json({
                msg: "successful all products",
                count: products.length,
                products
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})

router.get("/:id", (req, res) => {
    productModel
        .findById(req.params.id)
        .then(product => {
            res.json({
                msg: `successful get ${req.params.id}`,
                product
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})

router.post("/", (req, res) => {
    const newProduct = new productModel({
        name: req.body.productName,
        price: req.body.productPrice,
        desc: req.body.content
    })
    newProduct
        .save()
        .then(result => {
            res.json({
                msg: "successful post new product",
                newProductInfo: {
                    id: result.id,
                    name: result.name,
                    price: result.price,
                    desc: result.desc
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
})

export default router
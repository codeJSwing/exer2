import express from "express"
import productModel from "../models/product.js";
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        msg: "successful get all products"
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
                    name: result.name,
                    price: result.price
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
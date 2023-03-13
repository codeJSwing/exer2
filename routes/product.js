import express from "express"
import productModel from "../models/product.js";
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

router.get("/:id", async(req, res) => {
    const {id} = req.params
    try{
        const product = await productModel.findById(id)
        if(!product){
            res.json({
                msg: `no data`
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

router.delete("/", (req, res) => {
    productModel
        .deleteMany()
        .then(_ =>{
            res.json({
                msg: `successful delete all data`
            })
        })
        .catch(err => {
            res.status.json({
                msg: err.message
            })
        })
})

router.delete("/:id", (req, res) => {
    productModel
        .findByIdAndDelete(req.params.id)
        .then(_ => {
            res.json({
                msg: `successful delete data`
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
})

export default router
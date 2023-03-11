import express from "express";
import orderModel from "../models/order.js";
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        msg: "successful get all orders"
    })
})

router.post("/", (req, res) => {
    const newOrder = new orderModel({
        title: req.body.orderTitle
    })
    newOrder
        .save()
        .then(result => {
            res.json({
                msg: "successful post new order",
                orderInfo: {
                    title: result.title
                }
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})

export default router
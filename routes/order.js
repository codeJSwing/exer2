import express from "express";
import orderModel from "../models/order.js";
const router = express.Router()

router.get("/", (req, res) => {
    orderModel
        .find()
        .then(orders => {
            res.json({
                msg: `successful get orders`,
                count: orders.length,
                orders
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
        })
})

router.get("/:id", (req, res) => {
    orderModel
        .findById(req.params.id)
        .then(order => {
            res.json({
                msg: `successful get ${req.params.id}`,
                order
            })
        })
        .catch(err => {
            res.status(404).json({
                msg: err.message
            })
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

router.delete("/", (req, res) => {
    orderModel
        .deleteMany()
        .then(_ => {
            res.json({
                msg: `successful delete all data`
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
})

router.delete("/:id", (req, res) => {
    orderModel
        .findByIdAndDelete()
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
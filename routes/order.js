import express from "express";
import orderModel from "../models/order.js";
const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const orders = await orderModel.find()
        return res.json({
            msg: "successful get orders",
            orders: orders.map(order => ({
                title: order.title
            }))
        })

    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
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

router.post("/", async (req, res) => {
    const {title, quantity} = req.body
    try{
        const newOrder = new orderModel({
            title,
            quantity
        })
        const createOrder = await newOrder.save()
        return res.json({
            msg: `successful create new order`,
            createOrder
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
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

router.put("/", (req, res) => {
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    orderModel
        .findByIdAndUpdate(req.params.id, {$set: updateOps})
        .then(_ => {
            res.json({
                msg: `successful update order by ${req.params.id}`
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
})

export default router
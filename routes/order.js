import express from "express";
import orderModel from "../models/order.js";
const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const orders = await orderModel.find()
        return res.json({
            msg: "successful get orders",
            orders: orders.map(order => ({
                title: order.title,
                quantity: order.quantity,
                id: order._id
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

router.delete("/", async(req, res) => {
    try{
        const deleteOrder = await orderModel.deleteMany()
        return res.json({
            msg: `successful deleted all data`,
            deleteOrder
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const deleteOrder = await orderModel.findByIdAndDelete(id)
        return res.json({
            msg: `successfully deleted order`,
            deleteOrder
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
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
        const updateOrder = await orderModel.findByIdAndUpdate(id, {$set: updateOps})
        return res.json({
            msg: `successfully updated order by ${id}`,
            updateOrder
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})

export default router
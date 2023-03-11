import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    count: Number,
    title: String
})

const orderModel = mongoose.model("Order", orderSchema)
export default orderModel
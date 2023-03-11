import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    desc: String
})

const productModel = mongoose.model("Product", productSchema)
export default productModel
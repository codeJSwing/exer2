import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import morgan from "morgan"
import mongoose from "mongoose"
import productRouter from "./routes/product.js";
import orderRouter from "./routes/order.js";

const app = express()
dotenv.config()
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/product", productRouter)
app.use("/order", orderRouter)

const dbAddress = process.env.MONGODB_URL
mongoose
    .connect(dbAddress)
    .then(_ => console.log("Mongo DB connected"))
    .catch(err => console.log(err.message))

const port = process.env.PORT || 5555
app.listen(port, console.log("Server started"))
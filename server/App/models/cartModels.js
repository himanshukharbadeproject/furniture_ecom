let mongoose = require("mongoose")
let cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    image: String,
    pid: {type: mongoose.Types.ObjectId, ref: "product"},
    price: Number,
    qty: Number,
    color: {type: mongoose.Types.ObjectId, ref: "color"},
    userId: {type: mongoose.Types.ObjectId, ref: "user"},
    cartOrder: Number,
    cartStatus: Boolean
})

let cartModel = mongoose.model("cart",cartSchema)
module.exports = {cartModel}
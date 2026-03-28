let mongoose = require("mongoose")
let orderSchema = new mongoose.Schema({
    orderItems: [],
    shippingAddress: {
        type: Object
    },
    PaymentMethod: {
        type: String,
        enum: ["1","2"], //1--> cash on delivery 2--> online payment
        default: "1"
    },
    paymentStatus: {
        type: String,
        enum: ["1","2","3"], // 1: pending, 2:completed, 3:failed
        default: "1"
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPayment: {
        type: String
    },
    orderAmount: {
        type: Number
    },
    orderQty: {
        type: Number
    },
    shippingCharges: {
        type: Number
    },
    orderStatus: {
        type: String,
        enum: ["pending","process","completed"],
        default: "pending"
    },
    userId: {
        type: mongoose.Types.ObjectId, ref: "user"
    }
},{
    timestamps: true
}
)

let orderModel = mongoose.model("order",orderSchema)
module.exports = {orderModel}
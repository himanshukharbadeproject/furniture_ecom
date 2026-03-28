let express = require("express")
const { checkToken } = require("../../middleware/checkToken")
const { orderSave, verifyOrder } = require("../../controllers/web/orderController")

let orderRoutes = express.Router()

orderRoutes.post("/order-save", checkToken, orderSave)
orderRoutes.post("/verify-order", checkToken, verifyOrder)

module.exports = {orderRoutes}
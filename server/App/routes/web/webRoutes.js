let express = require("express")
const { userAuthRoutes } = require("./userAuthRoutes")
const { homeWebRoutes } = require("./homeWebRoutes")
const { cartRoutes } = require("./cartRoutes")
const { orderRoutes } = require("./orderRoutes")
let webRoutes = express.Router()

webRoutes.use("/user", userAuthRoutes)
webRoutes.use("/home", homeWebRoutes)
webRoutes.use("/cart", cartRoutes)
webRoutes.use("/order", orderRoutes)

module.exports = {webRoutes}
let express = require("express")
const { checkToken } = require("../../middleware/checkToken")
const { addToCart, viewCart, deleteCartItem, updateQty, getCountry } = require("../../controllers/web/cartWebController")

let cartRoutes = express.Router()

cartRoutes.post('/add-to-cart', checkToken, addToCart)
cartRoutes.post('/view-cart', checkToken, viewCart)
cartRoutes.delete('/delete-cart/:id', deleteCartItem)
cartRoutes.patch('/update-qty/:id', updateQty)
cartRoutes.get('/country', getCountry)

module.exports = {cartRoutes}
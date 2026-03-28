let express = require("express")
const { SliderWebView, ThreeSections, BestSellingView } = require("../../controllers/web/homeWebController")

let homeWebRoutes = express.Router()
// const multer = require("multer")
// let uploads = multer()

homeWebRoutes.get("/slider", SliderWebView)
homeWebRoutes.get("/threeSections", ThreeSections)
homeWebRoutes.get("/bestSelling", BestSellingView)


module.exports = {homeWebRoutes}
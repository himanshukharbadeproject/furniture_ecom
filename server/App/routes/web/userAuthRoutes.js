let express = require("express")
const { register, login, changePassword, userData, googleLogin } = require("../../controllers/web/userAuthController")
const multer = require("multer")
const { checkToken } = require("../../middleware/checkToken")

let userAuthRoutes = express.Router()
let uploads = multer()

userAuthRoutes.post("/register",uploads.none(), register)
userAuthRoutes.post("/login",uploads.none(), login)
userAuthRoutes.post("/change-password",uploads.none(), checkToken, changePassword)
userAuthRoutes.post("/profile-data",uploads.none(), checkToken, userData)
userAuthRoutes.post("/create-user-google-login",uploads.none(), googleLogin)

module.exports = {userAuthRoutes}
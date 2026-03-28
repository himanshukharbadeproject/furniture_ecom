let express = require("express");
const { adminLogin, sendOtp, verifyOTP, resetPassword, changePassword } = require("../../controllers/adminAuthController");

let adminAuthRoutes = express.Router();
adminAuthRoutes.use(express.json())


adminAuthRoutes.post("/login",adminLogin)

adminAuthRoutes.post("/sendOTP",sendOtp)

adminAuthRoutes.post("/verifyOTP",verifyOTP)

adminAuthRoutes.post("/resetPassword",resetPassword)

adminAuthRoutes.post("/change-password",changePassword)


module.exports = {adminAuthRoutes}
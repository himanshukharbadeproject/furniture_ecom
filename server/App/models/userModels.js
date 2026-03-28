let mongoose = require("mongoose")
let userScheme = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 50
    },
    userName: String,
    userPassword: String,
    userPhone: String,
    userGender: Number,
    userAddress: String
},{
    timestamps: true
})

let userModel = mongoose.model("user",userScheme)
module.exports={userModel}
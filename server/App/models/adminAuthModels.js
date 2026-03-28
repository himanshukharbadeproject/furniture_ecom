let mongoose = require("mongoose")
let AdminAuthSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    adminPassword: String
})

let AdminAuthModel = mongoose.model("Admin",AdminAuthSchema)
module.exports = {AdminAuthModel}
let mongoose = require("mongoose")
let colorSchema = new mongoose.Schema({
    colorName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    pickedColor: String,
    colorOrder: Number,
    colorStatus: Boolean
})

let colorModel = mongoose.model("color",colorSchema)
module.exports = {colorModel}
let mongoose = require("mongoose")
let chooseScheme = new mongoose.Schema({
    chooseTitle: {
        type: String,
        required: true,
        unique: true
    },
    chooseOrder: Number,
    chooseDesc: String,
    chooseStatus: Boolean,
    chooseImage: String
})

let chooseModel = mongoose.model("choose",chooseScheme)
module.exports={chooseModel}
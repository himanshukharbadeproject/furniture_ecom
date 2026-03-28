let mongoose = require("mongoose")
let countryScheme = new mongoose.Schema({
    countryName: {
        type: String,
        required: true,
        unique: true
    },
    countryOrder: Number,
    countryStatus: Boolean,
})

let countryModel = mongoose.model("country",countryScheme)
module.exports={countryModel}
let mongoose = require("mongoose")
let SliderSchema = new mongoose.Schema({
    sliderTitle: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    sliderImage: String,
    sliderOrder: Number,
    sliderStatus: Boolean
})

let SliderModel = mongoose.model("Slider",SliderSchema)
module.exports = {SliderModel}
let mongoose = require("mongoose")
let TestimonialSchema = new mongoose.Schema({
    testimonialName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    testimonialImage: String,
    testimonialOrder: Number,
    testimonialDesignation: String,
    testimonialRating: Number,
    testimonialMessage: String,
    testimonialStatus: Boolean
})

let TestimonialModel = mongoose.model("Testimonial",TestimonialSchema)
module.exports = {TestimonialModel}
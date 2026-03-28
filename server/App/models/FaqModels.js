let mongoose = require("mongoose")

let FaqSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    answer:{
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    faqOrder: Number,
    faqStatus: Boolean
})

let FaqModel = new mongoose.model("Faq",FaqSchema)
module.exports = {FaqModel}
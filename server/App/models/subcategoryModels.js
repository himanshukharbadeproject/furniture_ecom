let mongoose = require("mongoose")
const { default: slugify } = require("slugify")
let SubCategorySchema = new mongoose.Schema({
    subcategoryName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 40
    },
    parentCategory: {type: mongoose.Types.ObjectId, ref: "category"},
    subcategoryImage: String,
    subcategoryOrder: Number,
    subcategoryStatus: Boolean,
    slug: String
})

// this thing has to be paste as it is, important for slug
SubCategorySchema.pre("save", function () {
  if (this.isModified("subcategoryName")) {
    this.slug = slugify(this.subcategoryName, { lower: true })
  }
})

// if we update categoryName the slug should also gets updated with it therefore this is used
SubCategorySchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate()

  if (update?.$set?.subcategoryName) {
    update.$set.slug = slugify(update.$set.subcategoryName, { lower: true })
  }
})

let SubCategoryModel = mongoose.model("SubCategory",SubCategorySchema)
module.exports = {SubCategoryModel}
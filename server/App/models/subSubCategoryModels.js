let mongoose = require("mongoose")
const { default: slugify } = require("slugify")
let SubSubCategorySchema = new mongoose.Schema({
    subSubCategoryName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    parentCategoryM: {type: mongoose.Types.ObjectId, ref: "Category"},
    subCategoryM: {type: mongoose.Types.ObjectId, ref: "SubCategory"},
    subSubCategoryImage: String,
    subSubCategoryOrder: Number,
    subSubCategoryStatus: Boolean,
    slug: String
})

// this thing has to be paste as it is, important for slug
SubSubCategorySchema.pre("save", function () {
  if (this.isModified("subSubCategoryName")) {
    this.slug = slugify(this.subSubCategoryName, { lower: true })
  }
})

// if we update categoryName the slug should also gets updated with it therefore this is used
SubSubCategorySchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate()

  if (update?.$set?.subSubCategoryName) {
    update.$set.slug = slugify(update.$set.subSubCategoryName, { lower: true })
  }
})

let SubSubCategoryModel = mongoose.model("SubSubCategory",SubSubCategorySchema)
module.exports = {SubSubCategoryModel}
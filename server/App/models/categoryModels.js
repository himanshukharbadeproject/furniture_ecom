let mongoose = require("mongoose")
const slugify = require("slugify")

let CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 40
  },
  categoryImage: String,
  categoryOrder: Number,
  categoryStatus: Boolean,
  slug: String
})

// this thing has to be paste as it is, important for slug
CategorySchema.pre("save", function () {
  if (this.isModified("categoryName")) {
    this.slug = slugify(this.categoryName, { lower: true })
  }
})

// if we update categoryName the slug should also gets updated with it therefore this is used
CategorySchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate()

  if (update?.$set?.categoryName) {
    update.$set.slug = slugify(update.$set.categoryName, { lower: true })
  }
})

let CategoryModel = mongoose.model("Category", CategorySchema)
module.exports = { CategoryModel }

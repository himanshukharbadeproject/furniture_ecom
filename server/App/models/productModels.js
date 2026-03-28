let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let productScheme = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productParentCategory: {type: mongoose.Types.ObjectId, ref: "Category"},
    productSubCategory: {type: mongoose.Types.ObjectId, ref: "SubCategory"},
    productSubSubCategory: {type: mongoose.Types.ObjectId, ref: "SubSubCategory"},
    productMaterial: [{type: mongoose.Types.ObjectId, ref: "material"}],
    productColor: [{type: mongoose.Types.ObjectId, ref: "color"}],
    productType: {
        type: Number,
        enum: [1,2,3]},//1: featured, 2: New Arrival, 3: OnSale
    productBestSelling: Boolean,
    productTopRated: Boolean,
    productUpSell: Boolean,
    productActualPrice: Number,
    productSalePrice: Number,
    productStock: Number,
    productOrder: Number,
    productStatus: Boolean,
    productDesc: String,
    productImage: String,
    productBackImage: String,
    productGallery: [],
    slug: String
})

// this thing has to be paste as it is, important for slug
productScheme.pre("save", function () {
  if (this.isModified("productName")) {
    this.slug = slugify(this.productName, { lower: true })
  }
})

// if we update categoryName the slug should also gets updated with it therefore this is used
productScheme.pre("findOneAndUpdate", function () {
  const update = this.getUpdate()

  if (update?.$set?.productName) {
    update.$set.slug = slugify(update.$set.productName, { lower: true })
  }
})

let productModel = mongoose.model("product",productScheme)
module.exports={productModel}
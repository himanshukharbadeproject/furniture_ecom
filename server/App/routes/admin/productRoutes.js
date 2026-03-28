let express = require("express");
let multer = require("multer");
const { parentCategory, subCategory, getColor, getMaterial, subsubcategory, insertProduct, viewProduct, singleData, changeStatus, multiDelete, updateProduct } = require("../../controllers/productController");

let storage = multer.memoryStorage()

const upload = multer({storage: storage})

let productRoutes = express.Router();


// for many files we use fields
let middleWare = upload.fields([
    {
        name: "productImage",
        maxCount: 1
    },
    {
        name: "productBackImage",
        maxCount: 1
    },
    {
        name: "productGallery", 
        maxCount: 10
    }
])

productRoutes.get("/parent-category",parentCategory)
productRoutes.get("/sub-category/:parentId",subCategory)
productRoutes.get("/subsub-category/:subId",subsubcategory)
productRoutes.get("/product-color",getColor)
productRoutes.get("/product-material",getMaterial)
productRoutes.post("/insert",middleWare, insertProduct)
productRoutes.get("/view",viewProduct)
productRoutes.get("/single-view/:id",singleData)
productRoutes.post("/change-status",changeStatus)
productRoutes.post("/multi-delete",multiDelete)
productRoutes.post("/update-product/:id", middleWare, updateProduct)

module.exports = {productRoutes}



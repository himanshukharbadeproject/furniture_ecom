let express = require("express");
let multer = require("multer");
const { getParentCategory, subsubInsert, getSubCategory, viewData, getSingleParentData, getSingleSubCategory, changeStatus, multiDelete, singlesubsubcategory, updatesubsubcategory } = require("../../controllers/subSubCategoryController");

let storage = multer.memoryStorage();

const upload = multer({storage: storage})

let subsubcategoryRoutes = express.Router();

subsubcategoryRoutes.get("/parent-category",getParentCategory)
subsubcategoryRoutes.get("/sub-category/:id",getSubCategory)
subsubcategoryRoutes.post("/insert", upload.single("subSubCategoryImage"), subsubInsert);
subsubcategoryRoutes.get("/view",viewData)
subsubcategoryRoutes.get("/single-category/:id",getSingleParentData)
subsubcategoryRoutes.get("/single-subCategory/:id",getSingleSubCategory)
subsubcategoryRoutes.post("/change-status",changeStatus)
subsubcategoryRoutes.post("/multi-delete",multiDelete)
subsubcategoryRoutes.get("/single-subsubcategory/:id",singlesubsubcategory)
subsubcategoryRoutes.post("/update/:id", upload.single("subSubCategoryImage"), updatesubsubcategory);

module.exports = {subsubcategoryRoutes}



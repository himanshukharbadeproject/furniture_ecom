let express = require("express");
let multer = require("multer");

let storage = multer.memoryStorage();

const upload = multer({storage: storage})

const { subcategoryInsert, subcategoryView, subcategoryMultiDelete, parentCategory, singleParentCategory, changeStatus, singlesubcategory, updateSubCategory } = require("../../controllers/subcategoryController");
let subcategoryRoutes = express.Router();
subcategoryRoutes.use(express.json())

subcategoryRoutes.post("/insert", upload.single("subcategoryImage"), subcategoryInsert);

subcategoryRoutes.get("/view",subcategoryView);

subcategoryRoutes.get("/parentCategory", parentCategory)

subcategoryRoutes.get("/singleparentCategory/:id", singleParentCategory)

subcategoryRoutes.post("/changeStatus", changeStatus)

subcategoryRoutes.post("/multidel",subcategoryMultiDelete)

subcategoryRoutes.get("/single-subcategory/:id",singlesubcategory);

subcategoryRoutes.post("/update/:id", upload.single("subcategoryImage"), updateSubCategory);

module.exports = { subcategoryRoutes };
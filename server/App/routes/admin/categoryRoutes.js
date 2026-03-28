let express = require("express");
let multer = require("multer");

// let upload = multer({ dest: "uploads/category" });

// let storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         return cb(null,"uploads/category")
//     },
//     filename:function(req,file,cb){
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

const storage = multer.memoryStorage();

const upload = multer({storage: storage})


const { categoryInsert, categoryView, categoryMultiDelete, categoryChangeStatus, updateCategory, singleData } = require("../../controllers/categoryController");
let categoryRoutes = express.Router();
// categoryRoutes.use(express.json())

categoryRoutes.post("/insert", upload.single("categoryImage"), categoryInsert);

categoryRoutes.get("/view",categoryView);

categoryRoutes.post("/multidel",categoryMultiDelete)

categoryRoutes.post("/change-status",categoryChangeStatus)

categoryRoutes.post("/update-single/:id",upload.single("categoryImage"),updateCategory);


categoryRoutes.get("/single-data/:id",singleData);

module.exports = { categoryRoutes };

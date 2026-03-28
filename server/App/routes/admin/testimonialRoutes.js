let express = require("express");
let multer = require("multer");
const { testimonialInsert, testimonialView, testimonialChangeStatus, testimonialMultiDelete, testimonialSingleView, testimonialUpdate } = require("../../controllers/testimonialController");

// let upload = multer({ dest: "uploads/category" });

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"uploads/testimonial")
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

let testimonialRoutes = express.Router()

testimonialRoutes.post("/insert",upload.single("testimonialImage"),testimonialInsert)
testimonialRoutes.get("/view",testimonialView)
testimonialRoutes.post("/change-status",testimonialChangeStatus)
testimonialRoutes.post("/multi-delete",testimonialMultiDelete)
testimonialRoutes.get("/view/:id",testimonialSingleView)
testimonialRoutes.post("/update/:id",upload.single("testimonialImage"),testimonialUpdate)

module.exports = {testimonialRoutes}
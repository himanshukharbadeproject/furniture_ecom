let express = require("express");
let multer = require("multer");
const { sliderInsert, sliderView, sliderChangeStatus, sliderMultiDelete, sliderSingleData, sliderUpdate } = require("../../controllers/sliderController");

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"uploads/slider")
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

let sliderRoutes = express.Router()

sliderRoutes.post("/insert",upload.single("sliderImage"),sliderInsert)
sliderRoutes.get("/view",sliderView)
sliderRoutes.post("/change-status",sliderChangeStatus)
sliderRoutes.post("/multi-delete",sliderMultiDelete)
sliderRoutes.get("/view/:id",sliderSingleData)
sliderRoutes.post("/update/:id",upload.single("sliderImage"),sliderUpdate)

module.exports = {sliderRoutes}
let express = require("express");
let multer = require("multer");
const { chooseInsert, chooseView, chooseChangeStatus, chooseDelete, chooseSingleView, chooseUpdate } = require("../../controllers/chooseController");

// let upload = multer({ dest: "uploads/category" });

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"uploads/choose")
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

let chooseRoutes = express.Router();

chooseRoutes.post("/insert", upload.single("chooseImage"), chooseInsert);
chooseRoutes.get("/view", chooseView)
chooseRoutes.post("/change-status", chooseChangeStatus)
chooseRoutes.post("/multi-delete", chooseDelete)
chooseRoutes.get("/view-single/:id", chooseSingleView)
chooseRoutes.post("/update/:id",upload.single("chooseImage"), chooseUpdate)

module.exports = {chooseRoutes}



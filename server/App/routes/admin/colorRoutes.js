let express = require("express")
const { colorInsert, colorView, colorDelete, colorUpdate, colorMultiDel, singleColor, changeStatus } = require("../../controllers/colorController")
let colorRoutes = express.Router()

colorRoutes.use(express.json())

colorRoutes.post("/insert",colorInsert)

colorRoutes.get("/view",colorView)

colorRoutes.delete("/delete/:id",colorDelete)

colorRoutes.put("/update/:id",colorUpdate)

colorRoutes.post("/multidel",colorMultiDel)

colorRoutes.post("/change-status",changeStatus)

colorRoutes.get("/view/:id",singleColor)

module.exports = {colorRoutes}
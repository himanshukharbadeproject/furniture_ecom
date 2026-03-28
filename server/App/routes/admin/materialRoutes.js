let express = require("express")
const { materialInsert, materialView, materialDelete, materialUpdate, materialMultiDel, materialSingleView, materialChangeStatus } = require("../../controllers/materialController")
let materialRoutes = express.Router()
materialRoutes.use(express.json())

materialRoutes.post("/insert", materialInsert)

materialRoutes.get("/view", materialView)

materialRoutes.delete("/delete/:id", materialDelete)

materialRoutes.put("/update/:id", materialUpdate)

materialRoutes.post("/multidel", materialMultiDel)

materialRoutes.get("/view/:id", materialSingleView)

materialRoutes.post("/change-status",materialChangeStatus)

module.exports = {materialRoutes}
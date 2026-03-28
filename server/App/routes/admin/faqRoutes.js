let express = require("express")
const { faqInsert, faqView, faqDelete, faqUpdate, faqMultiDel, changeStatus, singleFaq } = require("../../controllers/faqController")
let faqRoutes = express.Router()
faqRoutes.use(express.json())

faqRoutes.post("/insert",faqInsert)
faqRoutes.get("/view", faqView)
faqRoutes.delete("/delete/:id", faqDelete)
faqRoutes.put("/update/:id", faqUpdate)
faqRoutes.post("/multiDel",faqMultiDel)
faqRoutes.get("/view/:id", singleFaq)
faqRoutes.post("/change-status",changeStatus)

module.exports = {faqRoutes}
let express = require("express");
const { countryUpdate, countryDelete, countryView, countryInsert, countryMultiDelete, countryChangeStatus, singleCountry } = require("../../controllers/countryController");
let countryRoutes = express.Router()

countryRoutes.use(express.json())

countryRoutes.post("/insert", countryInsert)

countryRoutes.get("/view", countryView)

countryRoutes.delete("/delete/:id", countryDelete)

countryRoutes.put("/update/:id", countryUpdate)

countryRoutes.post("/multiDel", countryMultiDelete)

countryRoutes.get("/view/:id", singleCountry)

countryRoutes.post("/change-status", countryChangeStatus)

module.exports = {countryRoutes}

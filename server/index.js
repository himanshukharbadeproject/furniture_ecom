let express = require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let app = express();
let cors = require("cors")
// app.use(cors())
let mongoose = require("mongoose");
const { AdminAuthModel } = require("./App/models/adminAuthModels");
const { webRoutes } = require("./App/routes/web/webRoutes");

require("dotenv").config();

// app.use("/admin", adminRoutes);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);  //http://localhost:8000/admin
app.use("/web", webRoutes)  //http://localhost:8000/web


// this below allows access for the uploads file
app.use("/uploads/category",express.static("uploads/category"))
app.use("/uploads/subcategory", express.static("uploads/subcategory"));
app.use("/uploads/testimonial",express.static("uploads/testimonial"))
app.use("/uploads/slider",express.static("uploads/slider"))
app.use("/uploads/choose",express.static("uploads/choose"))
app.use("/uploads/subsubcategory",express.static("uploads/subsubcategory"))
app.use("/uploads/product",express.static("uploads/products"))

mongoose.connect("mongodb://127.0.0.1:27017/furniture1").then(async(res) => {

  let checkAdmin = await AdminAuthModel.find();

  if(checkAdmin.length==0){
    await AdminAuthModel.insertOne({
      adminEmail: process.env.ADMINEMAIL,
      adminPassword: process.env.ADMINPASSWORD
    })
  }

  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8000");
  });
});

const { CategoryModel } = require("../models/categoryModels");
const { colorModel } = require("../models/colorModels");
const { materialModel } = require("../models/materialModels");
const { productModel } = require("../models/productModels");
const { SubCategoryModel } = require("../models/subcategoryModels");
const { SubSubCategoryModel } = require("../models/subSubCategoryModels");
let fs = require("fs");
const path = require("path");

let parentCategory = async (req, res) => {
  let data = await CategoryModel.find().select("categoryName");
  let obj = {
    status: 1,
    data,
  };
  res.send(obj);
};

let subCategory = async (req, res) => {
  let { parentId } = req.params;
  let data = await SubCategoryModel.find({ parentCategory: parentId }).select(
    "subcategoryName",
  );
  let obj = {
    status: 1,
    data,
  };
  res.send(obj);
};

let subsubcategory = async (req, res) => {
  let { subId } = req.params;
  let data = await SubSubCategoryModel.find({ subCategoryM: subId }).select(
    "subSubCategoryName",
  );
  let obj = {
    status: 1,
    data,
  };
  res.send(obj);
};

let getColor = async (req, res) => {
  let data = await colorModel.find({ colorStatus: true }).select("colorName");
  let obj = {
    status: 1,
    data,
  };
  res.send(obj);
};

let getMaterial = async (req, res) => {
  let data = await materialModel
    .find({ materialStatus: true })
    .select("materialName");
  let obj = {
    status: 1,
    data,
  };
  res.send(obj);
};

const insertProduct = async (req, res) => {
  try {
    let obj = { ...req.body };
  obj["productStatus"] = true;

    // 1️⃣ Create product first
    let product = await productModel.create(obj);

    const productId = product._id;

    // Upload directory
    const uploadDir = path.join("uploads", "products");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let updateData = {};

    // 2️⃣ Save productImage
    if (req.files?.productImage?.[0]) {
      let file = req.files.productImage[0];

      let fileName = `${productId}-front-${Date.now()}.jpg`;
      let filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, file.buffer);

      updateData.productImage = fileName;
    }

    // 3️⃣ Save productBackImage
    if (req.files?.productBackImage?.[0]) {
      let file = req.files.productBackImage[0];

      let fileName = `${productId}-back-${Date.now()}.jpg`;
      let filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, file.buffer);

      updateData.productBackImage = fileName;
    }

    // 4️⃣ Save gallery images
    if (req.files?.productGallery?.length > 0) {
      let galleryPaths = [];

      req.files.productGallery.forEach((file, index) => {
        let fileName = `${productId}-gallery-${Date.now()}-${index}.jpg`;
        let filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, file.buffer);
        galleryPaths.push(fileName);
      });

      updateData.productGallery = galleryPaths;
    }

    // 5️⃣ Update product with image paths
    await productModel.findByIdAndUpdate(productId, updateData);

    res.send({
      status: 1,
      msg: "Product created successfully",
      productId
    });

  } catch (error) {
    console.log(error);
    res.send({ status: 0, msg: "Error while creating product" });
  }
};

let viewProduct = async (req, res) => {
  let {currentPage} = req.query

  let limit = 6

  let StaticImagePath = process.env.PRODUCTIMAGEPATH;
  console.log(StaticImagePath)
  
    let searchObj = {
  
    }
  
    if(req.query.productName!=""){
      searchObj["productName"] = {$regex: req.query.productName, $options: "si"}
    }
  
    if(req.query.productOrder){
      searchObj["productOrder"] = Number(req.query.productOrder)
    }
  
    let totalRecords = await productModel.find(searchObj)
  //   console.log(totalRecords)
    let totalPages = Math.ceil(totalRecords.length/limit)
  
    let finalSkip = (currentPage-1)*limit
  
    let viewRes = await productModel.find(searchObj).skip(finalSkip).limit(limit).populate("productParentCategory", "categoryName")
    .populate("productSubCategory", "subcategoryName")
    .populate("productSubSubCategory", "subSubCategoryName")
    .populate("productMaterial", "materialName")
    .populate("productColor", "colorName");
  
    let obj = {
      status: 1,
      msg: "Product Data View",
      StaticImagePath,
      viewRes,
      totalPages,
      limit
    };
    res.send(obj);
};

let singleData = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let StaticImagePath = process.env.PRODUCTIMAGEPATH;
  let singleView = await productModel
    .find({ _id: id })
    .populate("productParentCategory", "categoryName")
    .populate("productSubCategory", "subcategoryName")
    .populate("productSubSubCategory", "subSubCategoryName")
    .populate("productMaterial", "materialName")
    .populate("productColor", "colorName");

  let obj = {
    status: 1,
    msg: "Data Found",
    singleView,
    StaticImagePath
  };
  res.send(obj);
};

let changeStatus = async (req, res) => {
  let { ids } = req.body;
  console.log("IDS: " + ids);

  let arr = await productModel.find({ _id: ids }).select("productStatus");
  console.log(arr);

  for (let item of arr) {
    await productModel.updateOne(
      { _id: item._id },
      { $set: { productStatus: !item.productStatus } },
    );
  }

  let obj = {
    status: 1,
    msg: "Status Changed Successfully"
  }

  res.send(obj);
};

let multiDelete = async(req, res)=>{
  let {ids} = req.body
  console.log("IDS: ",ids)

  let productData = await productModel.find({ _id: ids }).select(
      "productImage",
    );
  
    console.log(productData);
  
    for (let v of productData) {
      let deletePath = "uploads/product/" + v.productImage;
      console.log(deletePath)
      fs.unlinkSync(deletePath);
    }
  
    let deleteRes = await productModel.deleteMany({ _id: ids });
  
    let obj = {
      status: 1,
      msg: "Product Deleted",
      deleteRes,
    };
    res.send(obj);
}

let updateProduct = async (req, res) => {
  let { id } = req.params;

  try {
    let oldData = await productModel.findById(id);

    let uploadDir = path.join("uploads", "products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let updateData = { ...req.body };

    // FRONT IMAGE
    if (req.files?.productImage?.[0]) {
      if (oldData.productImage) {
        let oldPath = path.join(uploadDir, oldData.productImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      let file = req.files.productImage[0];
      let fileName = `${id}-front-${Date.now()}.jpg`;
      fs.writeFileSync(path.join(uploadDir, fileName), file.buffer);
      updateData.productImage = fileName;
    }

    // BACK IMAGE
    if (req.files?.productBackImage?.[0]) {
      if (oldData.productBackImage) {
        let oldPath = path.join(uploadDir, oldData.productBackImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      let file = req.files.productBackImage[0];
      let fileName = `${id}-back-${Date.now()}.jpg`;
      fs.writeFileSync(path.join(uploadDir, fileName), file.buffer);
      updateData.productBackImage = fileName;
    }

    // GALLERY (replace + delete old files)
    if (req.files?.productGallery?.length > 0) {
      if (oldData.productGallery?.length > 0) {
        oldData.productGallery.forEach((img) => {
          let oldPath = path.join(uploadDir, img);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        });
      }

      let gallery = [];

      req.files.productGallery.forEach((file, index) => {
        let fileName = `${id}-gallery-${Date.now()}-${index}.jpg`;
        fs.writeFileSync(path.join(uploadDir, fileName), file.buffer);
        gallery.push(fileName);
      });

      updateData.productGallery = gallery;
    }

    let updated = await productModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.send({
      status: 1,
      msg: "Product Updated Successfully",
      updated,
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: 0,
      msg: error.message,
    });
  }
};



module.exports = {
  parentCategory,
  subCategory,
  getColor,
  getMaterial,
  subsubcategory,
  insertProduct,
  viewProduct,
  singleData,
  changeStatus,
  multiDelete,
  updateProduct
};

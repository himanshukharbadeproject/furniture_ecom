let fs = require("fs");
const { SubCategoryModel } = require("../models/subcategoryModels");
const { CategoryModel } = require("../models/categoryModels");
let path = require("path");

let subcategoryInsert = async (req, res) => {
  let { subcategoryName, subcategoryOrder, parentCategory } = req.body;

  let obj = {
    parentCategory,
    subcategoryName,
    subcategoryOrder,
    subcategoryStatus: true,
  };

  try {
    let insertRes = await SubCategoryModel.create(obj);

    if (req.file) {
      let fileName = Date.now() + "-" + req.file.originalname;
      let filePath = path.join("uploads/subcategory", fileName);

      fs.writeFileSync(filePath, req.file.buffer);

      await SubCategoryModel.updateOne(
        { _id: insertRes._id },
        { $set: { subcategoryImage: fileName } }
      );

      insertRes.subcategoryImage = fileName;
    }

    res.send({
      status: 1,
      msg: "Sub-Category Inserted",
      insertRes,
    });

  } catch (error) {
    res.send({
      status: 0,
      msg: error.message,
    });
  }
};

let parentCategory = async (req, res) => {
  // let data = await CategoryModel.find({categoryStatus: true})
  let category = await CategoryModel.find().select("categoryName");
  let obj = {
    status: 1,
    category,
  };
  res.send(obj);
};

let singleParentCategory = async (req, res) => {
  let { id } = req.params; // ✅ correct

  let category = await CategoryModel.findById(id).select("categoryName");

  res.send({
    status: 1,
    category,
  });
};

let subcategoryView = async (req, res) => {
//   console.log(req.query);

   let {currentPage} = req.query

  let limit = 3
  //   let {subcategoryName, subcategoryOrder} = req.params
  //   console.log(subcategoryName, subcategoryOrder)

  let StaticImagePath = process.env.SUBCATEGORYIMAGEPATH;

  let searchObj = {

  }

  if(req.query.subcategoryName!=""){
    searchObj["subcategoryName"] = {$regex: req.query.subcategoryName, $options: "si"}
  }

  if(req.query.subcategoryOrder){
    searchObj["subcategoryOrder"] = Number(req.query.subcategoryOrder)
  }

  let totalRecords = await SubCategoryModel.find(searchObj)
//   console.log(totalRecords)
  let totalPages = Math.ceil(totalRecords.length/limit)

  let finalSkip = (currentPage-1)*limit

  let viewRes = await SubCategoryModel.find(searchObj).skip(finalSkip).limit(limit)

  let obj = {
    status: 1,
    msg: "Sub-Category Viewed",
    StaticImagePath,
    viewRes,
    totalPages,
    limit
  };
  res.send(obj);
};

let changeStatus = async (req, res) => {
  let { ids } = req.body;

  let arr = await SubCategoryModel.find({ _id: ids }).select(
    "subcategoryStatus",
  );
  // console.log(arr)

  for (let v of arr) {
    await SubCategoryModel.updateOne(
      { _id: v._id },
      { $set: { subcategoryStatus: !v.subcategoryStatus } }
    )
  }

  let obj = {
    status: 1,
    msg: "Status Changed",
  };

  res.send(obj);
};

let subcategoryMultiDelete = async (req, res) => {
  let { ids } = req.body;

  let subcategoryData = await SubCategoryModel.find({ _id: ids }).select(
    "subcategoryImage",
  );

  console.log(subcategoryData);

  for (let v of subcategoryData) {
    let deletePath = "uploads/subcategory/" + v.subcategoryImage;
    fs.unlinkSync(deletePath);
  }

  let deleteRes = await SubCategoryModel.deleteMany({ _id: ids });

  let obj = {
    status: 1,
    msg: "Material Deleted",
    deleteRes,
  };
  res.send(obj);
};

let singlesubcategory = async(req, res)=>{
  let {id} = req.params

  let singleRes = await SubCategoryModel.find({_id: id})
  let StaticImagePath = process.env.SUBCATEGORYIMAGEPATH;

  let obj = {
    status: 1,
    msg: "Single Response Data Received",
    singleRes,
    StaticImagePath
  }

  res.send(obj)
}

let updateSubCategory = async(req, res)=>{
  let {id} = req.params
  let {parentCategory, subcategoryName, subcategoryOrder} = req.body
  // console.log(parentCategory, subcategoryName, subcategoryOrder)

  let obj = {
    parentCategory,
    subcategoryName,
    subcategoryOrder
  }
  let objRes

  try{
    let oldData = await SubCategoryModel.find({_id: id})
    console.log(oldData)

    if(req.file && req.file.filename){
      obj["subcategoryImage"] = req.file.filename
    }

    if(oldData.subcategoryImage){
      let deletePath = "uploads/subcategory/" + oldData.subcategoryImage

      if(fs.existsSync(deletePath)){
        fs.unlinkSync(deletePath)
      }
    }

    let updateRes = await SubCategoryModel.findOneAndUpdate({_id: id}, {$set: obj}, {new: true});

    objRes = {
      status: 1,
      msg: "SubCategory Updated",
      updateRes
    }
  }
  catch(e){
    objRes = {
      status: 1,
      msg: e.message,
    }
  }
  res.send(objRes)
}

module.exports = {
  subcategoryInsert,
  subcategoryView,
  subcategoryMultiDelete,
  parentCategory,
  singleParentCategory,
  changeStatus,
  singlesubcategory,
  updateSubCategory
};

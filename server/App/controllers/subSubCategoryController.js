const { CategoryModel } = require("../models/categoryModels");
const { SubCategoryModel } = require("../models/subcategoryModels");
const { SubSubCategoryModel } = require("../models/subSubCategoryModels");
let fs = require("fs")
let path = require("path");


let getParentCategory = async (req, res) => {
  let data = await CategoryModel.find().select("categoryName");
  let obj;
  try {
    obj = {
      status: 1,
      msg: "data Found",
      data,
    };
  } catch (e) {
    obj = {
      status: 0,
      msg: e,
    };
  }
  res.send(obj);
};

let getSubCategory = async (req, res) => {
  let { id } = req.params;
  let data = await SubCategoryModel.find({ parentCategory: id }).select(
    "subcategoryName",
  );
  console.log(data)
  let obj;
  try {
    obj = {
      status: 1,
      msg: "data Found",
      data,
    };
  } catch (e) {
    obj = {
      status: 0,
      msg: e,
    };
  }
  res.send(obj);
};

let subsubInsert = async (req, res) => {
  let { parentCategoryM, subCategoryM, subSubCategoryName, subSubCategoryOrder} = req.body;
  let obj = {
    parentCategoryM,
    subCategoryM,
    subSubCategoryName,
    subSubCategoryOrder,
    subSubCategoryStatus: true,
  };
  try {
      let insertRes = await SubSubCategoryModel.create(obj);
  
      if (req.file) {
        let fileName = Date.now() + "-" + req.file.originalname;
        let filePath = path.join("uploads/subsubcategory", fileName);
  
        fs.writeFileSync(filePath, req.file.buffer);
  
        await SubSubCategoryModel.updateOne(
          { _id: insertRes._id },
          { $set: { subSubCategoryImage: fileName } }
        );
  
        insertRes.subSubCategoryImage = fileName;
      }
  
      res.send({
        status: 1,
        msg: "Sub-Sub-Category Inserted",
        insertRes,
      });
  
    } catch (error) {
      console.log(error)
      res.send({
        status: 0,
        msg: error.message,
      });
    }

};

let viewData = async(req, res)=>{
  let limit = 5;
  let staticPath = process.env.SUBSUBCATEGORYIMAGEPATH
  let {currentPage} = req.query
  // console.log(subsubcategoryName, subsubcategoryOrder)

  let searchObj = {

  }

  if(req.query.subsubcategoryName!=""){
    searchObj["subSubCategoryName"] = {$regex: req.query.subsubcategoryName, $options: "si"}
  }

  if(req.query.subsubcategoryOrder){
    searchObj["subSubCategoryOrder"] = Number(req.query.subsubcategoryOrder)
  }

  let totalRec = await SubSubCategoryModel.find(searchObj)
  let totalPages = Math.ceil(totalRec.length/limit)
  let finalSkip = (currentPage-1)*limit

  let viewRes = await SubSubCategoryModel.find(searchObj).skip(finalSkip).limit(limit) 

  let obj = {
      status: 1,
      msg: "SubSubCategory Data Inserted",
      viewRes,
      staticPath,
      limit,
      totalPages
    };
    res.send(obj)
}

let getSingleParentData = async(req, res)=>{
  console.log(req.params)
  let {id} = req.params
  console.log(id)
  let category = await CategoryModel.findById(id).select("categoryName")

  let obj = {
    status:1,
    category
  }
  res.send(obj)
}

let getSingleSubCategory = async(req, res)=>{
  let {id} = req.params
  let subcategory = await SubCategoryModel.findById(id).select("subcategoryName")
  let obj = {
    status: 1,
    subcategory
  }
  res.send(obj)
}

let changeStatus = async(req, res)=>{
  let {ids} = req.body

  let arr = await SubSubCategoryModel.find({_id: ids}).select("subSubCategoryStatus")
  // console.log(arr)

  for(let item of arr){
    await SubSubCategoryModel.updateOne({_id: item._id},{$set: {subSubCategoryStatus: !item.subSubCategoryStatus}})
  }

  let obj = {
    status: 1,
    msg: "Change-Status successfully"
  }

  res.send(obj)
}

let multiDelete = async(req, res)=>{
  let {ids} = req.body

  let arr = await SubSubCategoryModel.find({_id: ids}).select("subSubCategoryImage")
  console.log(arr)

  for(let item of arr){
    let deletePath = "uploads/subsubcategory/"+item.subSubCategoryImage
    fs.unlinkSync(deletePath)
  }

  let deleteRes = await SubSubCategoryModel.deleteMany({_id: ids})

  let obj = {
    status: 1,
    msg: "Data Deleted",
    deleteRes
  }

  res.send(obj)
}

let singlesubsubcategory = async(req, res)=>{
  let {id} = req.params

  let singleData = await SubSubCategoryModel.find({_id: id})
  let staticPath = process.env.SUBSUBCATEGORYIMAGEPATH

  let obj = {
    status: 1,
    msg: "Single Data Found",
    singleData,
    staticPath
  }

  res.send(obj) 
}

let updatesubsubcategory = async(req, res)=>{
  let {id} = req.params
  let { parentCategoryM, subCategoryM, subSubCategoryName, subSubCategoryOrder} = req.body;

  let objData = {
    parentCategoryM,
    subCategoryM,
    subSubCategoryName,
    subSubCategoryOrder
  }

  let objRes

  try{
    let oldData = await SubSubCategoryModel.find({_id: id})
    console.log(oldData)

    if(req.file && req.file.filename){
      objData["subSubCategoryImage"] = req.file.filename
    }

    if(oldData.subSubCategoryImage){
      let deletePath = "uploads/subsubcategory/"+ oldData.subSubCategoryImage

      if(fs.existsSync(deletePath)){
        fs.unlinkSync(deletePath)
      }
    }

    let updateRes = await SubSubCategoryModel.findOneAndUpdate({_id: id},{$set: objData}, {new: true})

    objRes = {
      status: 1,
      msg: "Data Updated",
      updateRes
    }
  }
  catch(e){
    objRes = {
      status: 0,
      msg: e.message
    }
  }
  res.send(objRes)

}

module.exports = { getParentCategory, subsubInsert, getSubCategory, viewData, getSingleParentData, getSingleSubCategory, changeStatus, multiDelete, singlesubsubcategory, updatesubsubcategory};

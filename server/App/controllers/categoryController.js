const { CategoryModel } = require("../models/categoryModels");
let fs = require("fs");
let path = require("path");

let categoryInsert = async (req, res) => {
  let { categoryName, categoryOrder } = req.body;

  let obj = {
    categoryName,
    categoryOrder,
    categoryStatus: true,
  };

  try {
    let insertRes = await CategoryModel.create(obj);

    if (req.file) {
      let fileName = Date.now() + "-" + req.file.originalname;
      let filePath = path.join("uploads/category", fileName);

      fs.writeFileSync(filePath, req.file.buffer);

      await CategoryModel.updateOne(
        { _id: insertRes._id },
        { $set: { categoryImage: fileName } }
      );

      insertRes.categoryImage = fileName;
    }

    res.send({
      status: 1,
      msg: "Category Inserted",
      insertRes,
    });

  } catch (error) {
    res.send({
      status: 0,
      msg: error.message,
    });
  }
};


let categoryView = async (req, res) => {
  let { currentPage } = req.query;
  let limit = 3;
  let searchObj = {};

  if (req.query.categoryName != "") {
    searchObj["categoryName"] = {
      $regex: req.query.categoryName,
      $options: "si",
    };
  }

  if (req.query.categoryOrder) {
    searchObj["categoryOrder"] = Number(req.query.categoryOrder);
  }

  let ArrRecords = await CategoryModel.find(searchObj);
  let totalPages = Math.ceil(ArrRecords.length / limit);
  // console.log(totalPages)

  let finalSkip = limit * (currentPage - 1);

  let viewRes = await CategoryModel.find(searchObj)
    .skip(finalSkip)
    .limit(limit);
  let StaticImagePath = process.env.CATEGORYIMAGEPATH;

  let obj = {
    status: 1,
    msg: "Category Viewed",
    StaticImagePath,
    viewRes,
    totalPages,
    limit,
  };
  res.send(obj);
};

let categoryMultiDelete = async (req, res) => {
  let { ids } = req.body;

  let categoryData = await CategoryModel.find({ _id: ids }).select(
    "categoryImage",
  );

  // console.log(categoryData);

  for (let v of categoryData) {
    let deletePath = "uploads/category/" + v.categoryImage;
    // console.log(deletePath);
    fs.unlinkSync(deletePath);
  }

  let deleteRes = await CategoryModel.deleteMany({ _id: ids });

  let obj = {
    status: 1,
    msg: "Category Deleted",
    deleteRes,
  };
  res.send(obj);
};

let categoryChangeStatus = async (req, res) => {
  // console.log(req.body);
  let { ids } = req.body;

  let arr = await CategoryModel.find({ _id: ids });

  // console.log(arr);

  for (let v of arr) {
    await CategoryModel.updateOne(
      { _id: v._id },
      { $set: { categoryStatus: !v.categoryStatus } },
    );
  }

  let obj = {
    status: 1,
    msg: "Category Status changed Successfully",
  };

  res.send(obj);
};

// let updateCategory = async(req,res)=>{
//   let {id} = req.params

//   let {categoryName, categoryOrder} = req.body;
//     let obj = {
//         categoryName,
//         categoryOrder,
//         categoryStatus: true
//     }

//     if(req.file){
//         if(req.file.filename){
//             obj['categoryImage'] = req.file.filename;
//         }
//     }

//     console.log(obj)

//     try {
//     let updateRes = await CategoryModel.updateOne({_id: id},{$set: obj})

//     obj = {
//       status: 1,
//       msg: "Category Inserted",
//       updateRes,
//     };
//   } catch (error) {
//     obj = {
//       status: 0,
//       msg: error,
//     };

//   }

//     res.send(obj);

// }

let updateCategory = async (req, res) => {
  let { id } = req.params;

  let { categoryName, categoryOrder } = req.body;

  let obj = {
    categoryName,
    categoryOrder,
  };

  try {
    // get old data first
    let oldData = await CategoryModel.findOne({ _id: id });

    // if new image uploaded
    if (req.file && req.file.filename) {
      obj.categoryImage = req.file.filename;

      // delete old image
      if (oldData.categoryImage) {
        let deletePath = "uploads/category/" + oldData.categoryImage;

        if (fs.existsSync(deletePath)) {
          fs.unlinkSync(deletePath);
        }
      }
    }

    let updateRes = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true },
    );

    res.send({
      status: 1,
      msg: "Category Updated Successfully",
      updateRes,
    });
  } catch (error) {
    res.send({
      status: 0,
      msg: error.message,
    });
  }
};

let singleData = async (req, res) => {
  let { id } = req.params;
  let singleData = await CategoryModel.findOne({ _id: id });
  let path = process.env.CATEGORYIMAGEPATH;

  let obj = {
    status: 1,
    msg: "Got The data",
    singleData,
    path,
  };

  res.send(obj);
};

module.exports = {
  categoryInsert,
  categoryView,
  categoryMultiDelete,
  categoryChangeStatus,
  updateCategory,
  singleData,
};

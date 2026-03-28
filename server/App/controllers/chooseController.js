const { chooseModel } = require("../models/chooseModels");
let fs = require("fs");

let chooseInsert = async (req, res) => {
  let { chooseTitle, chooseOrder, chooseDesc } = req.body;

  let objData = {
    chooseTitle,
    chooseOrder,
    chooseDesc,
    chooseStatus: true,
  };
  let obj;

  try {
    if (req.file) {
      if (req.file.filename) {
        objData["chooseImage"] = req.file.filename;
      }
    }
    console.log(objData);
    let insertRes = await chooseModel.insertOne(objData);

    obj = {
      status: 1,
      msg: "Choose Us Inserted",
      insertRes,
    };
  } catch (e) {
    obj = {
      status: 0,
      msg: e,
    };
  }
  res.send(obj);
};

let chooseView = async (req, res) => {
  let limit = 2;
    let { title, order, currentPage } = req.query;

    let searchObj = {};

    if (title != "") {
      searchObj["chooseTitle"] = { $regex: title, $options: "si" };
    }

    if (order) {
      searchObj["chooseOrder"] = Number(order);
    }

    let totalRec = await chooseModel.find(searchObj);
    let totalPages = Math.ceil(totalRec.length / limit);

    let finalSkip = (currentPage - 1) * limit;

    let viewRes = await chooseModel
      .find(searchObj)
      .skip(finalSkip)
      .limit(limit);
    let staticPath = process.env.CHOOSEIMAGEPATH;

    let obj = {
      status: 1,
      msg: "Choose Us Inserted",
      viewRes,
      staticPath,
      limit,
      totalPages,
    };

    res.send(obj);
};

let chooseChangeStatus = async (req, res) => {
  let { ids } = req.body;

  let arr = await chooseModel.find({ _id: ids }).select("chooseStatus");

  for (let item of arr) {
    await chooseModel.updateOne(
      { _id: item._id },
      { $set: { chooseStatus: !item.chooseStatus } },
    );
  }

  let obj = {
    status: 1,
    msg: "Choose-Us Status Changed",
  };

  res.send(obj);
};

let chooseDelete = async (req, res) => {
  let { ids } = req.body;

  let arr = await chooseModel.find({ _id: ids }).select("chooseImage");

  for (let item of arr) {
    let deletePath = "uploads/choose/" + item.chooseImage;
    fs.unlinkSync(deletePath);
  }

  let deleteRes = await chooseModel.deleteMany({ _id: ids });

  let obj = {
    status: 1,
    msg: "Choose-Us Deleted",
    deleteRes,
  };

  res.send(obj);
};

let chooseSingleView = async(req,res)=>{
  let {id} = req.params
  let path = process.env.CHOOSEIMAGEPATH
  let singleData = await chooseModel.find({_id: id})

  let obj = {
    status: 1,
    msg: "Single Data Found",
    singleData,
    path
  }

  res.send(obj)
}

let chooseUpdate = async(req, res)=>{
  let {id} = req.params
  let { chooseTitle, chooseOrder, chooseDesc } = req.body;

  let objData = {
    chooseTitle,
    chooseOrder,
    chooseDesc
  }
  let objRes

  try {
    let oldData = await chooseModel.findOne({ _id: id });
    console.log(oldData);

    if (req.file && req.file.filename) {
      objData["chooseImage"] = req.file.filename;
      console.log(objData["chooseImage"]);
    }

    if (oldData.chooseImage) {
      let deletePath = "uploads/choose/" + oldData.chooseImage;
      console.log(deletePath);

      if (fs.existsSync(deletePath)) {
        fs.unlinkSync(deletePath);
      }
    }

    let updateRes = await chooseModel.updateOne({ _id: id }, { $set: objData });

    objRes = {
      status: 1,
      msg: "Choose Us Data Updated",
      updateRes,
    };
  } catch (e) {
    objRes = {
      status: 0,
      msg: e,
    };
  }
  res.send(objRes)
}

module.exports = { chooseInsert, chooseView, chooseChangeStatus, chooseDelete, chooseSingleView, chooseUpdate};
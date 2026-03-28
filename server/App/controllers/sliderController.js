const { SliderModel } = require("../models/sliderModels");
let fs = require("fs");

let sliderInsert = async (req, res) => {
  let { sliderTitle, sliderOrder } = req.body;

  let obj = {
    sliderTitle,
    sliderOrder,
    sliderStatus: true,
  };

  if (req.file) {
    if (req.file.filename) {
      obj["sliderImage"] = req.file.filename;
    }
  }

  console.log(obj);

  try {
    let sliderRes = await SliderModel.insertOne(obj);
    obj = {
      status: 1,
      msg: "Slider Inserted",
      sliderRes,
    };
  } catch (error) {
    obj = {
      status: 0,
      msg: "Slider Not Inserted",
    };
  }

  res.send(obj);
};

let sliderView = async (req, res) => {
  let limit = 3;
  // console.log(req.query)
  let { currentPage } = req.query;
  // console.log(sliderName, sliderOrder)
  let searchObj = {};

  if (req.query.sliderTitle != "") {
    searchObj["sliderTitle"] = {
      $regex: req.query.sliderTitle,
      $options: "si",
    };
  }

  if (req.query.sliderOrder) {
    searchObj["sliderOrder"] = Number(req.query.sliderOrder);
  }

  let totalRec = await SliderModel.find(searchObj);
  let totalPages = Math.ceil(totalRec.length / limit);
  let finalSkip = (currentPage - 1) * limit;

  let viewRes = await SliderModel.find(searchObj).skip(finalSkip).limit(limit);

  let staticPath = process.env.SLIDERIMAGEPATH;
  // console.log(limit)

  let obj = {
    status: 1,
    msg: "Slider data Got",
    viewRes,
    staticPath,
    totalPages,
    limit
  };

  res.send(obj);
};

let sliderChangeStatus = async (req, res) => {
  let { ids } = req.body;

  let arr = await SliderModel.find({ _id: ids }).select("sliderStatus");

  for (let item of arr) {
    await SliderModel.updateOne(
      { _id: item._id },
      { $set: { sliderStatus: !item.sliderStatus } },
    );
  }

  let obj = {
    status: 1,
    msg: "Slider Updated Successfully",
  };

  res.send(obj);
};

let sliderMultiDelete = async (req, res) => {
  let { ids } = req.body;

  let arr = await SliderModel.find({ _id: ids }).select("sliderImage");

  for (let item of arr) {
    let deletePath = "uploads/slider/" + item["sliderImage"];
    fs.unlinkSync(deletePath);
  }

  let deleteRes = await SliderModel.deleteMany({ _id: ids });

  let obj = {
    status: 1,
    msg: "Slider Deleted",
    deleteRes,
  };

  res.send(obj);
};

let sliderSingleData = async (req, res) => {
  let { id } = req.params;

  let viewSingleRes = await SliderModel.find({ _id: id });
  let path = process.env.SLIDERIMAGEPATH;

  let obj = {
    status: 1,
    msg: "Slider Single Data Found",
    viewSingleRes,
    path,
  };
  res.send(obj);
};

let sliderUpdate = async (req, res) => {
  let { id } = req.params;
  let { sliderTitle, sliderOrder } = req.body;

  let obj = {
    sliderTitle,
    sliderOrder,
  };

  let objRes;

  try {
    let oldData = await SliderModel.findOne({ _id: id });
    // console.log(oldData);

    if (req.file && req.file.filename) {
      obj["sliderImage"] = req.file.filename;
      // console.log(obj["sliderImage"]);
    }

    if (oldData.sliderImage) {
      let deletePath = "uploads/slider/" + oldData.sliderImage;
      // console.log(deletePath);

      if (fs.existsSync(deletePath)) {
        fs.unlinkSync(deletePath);
      }
    }

    let updateRes = await SliderModel.updateOne({ _id: id }, { $set: obj });

    objRes = {
      status: 1,
      msg: "Slider Data Updated",
      updateRes,
    };
  } catch (e) {
    objRes = {
      status: 0,
      msg: e,
    };
  }

  res.send(objRes);
};

module.exports = {
  sliderInsert,
  sliderView,
  sliderChangeStatus,
  sliderMultiDelete,
  sliderSingleData,
  sliderUpdate,
};

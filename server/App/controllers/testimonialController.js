const { TestimonialModel } = require("../models/testimonialModels");
let fs = require("fs");

let testimonialInsert = async (req, res) => {
  let {
    testimonialName,
    testimonialDesignation,
    testimonialRating,
    testimonialOrder,
    testimonialMessage,
  } = req.body;

  let obj = {
    testimonialName,
    testimonialDesignation,
    testimonialRating,
    testimonialOrder,
    testimonialMessage,
    testimonialStatus: true,
  };

  if (req.file) {
    if (req.file.filename) {
      obj["testimonialImage"] = req.file.filename;
    }
  }

  try {
    let InsertRes = await TestimonialModel.insertOne(obj);

    obj = {
      status: 1,
      msg: "Testimonial inserted",
      InsertRes,
    };
  } catch (e) {
    obj = {
      status: 0,
      msg: e,
    };
  }

  res.send(obj);
};

let testimonialView = async (req, res) => {
  let limit = 3;
  let { currentPage } = req.query;

  let staticPath = process.env.TESTIMONIALIMAGEPATH;

  let searchObj = {};

  if (req.query.testimonialName != "") {
    searchObj["testimonialName"] = {
      $regex: req.query.testimonialName,
      $options: "si",
    };
  }

  if (req.query.testimonialRating) {
    searchObj["testimonialRating"] = Number(req.query.testimonialRating);
  }

  if (req.query.testimonialOrder) {
    searchObj["testimonialOrder"] = Number(req.query.testimonialOrder);
  }

  let totalRec = await TestimonialModel.find(searchObj);
  let totalPages = Math.ceil(totalRec.length / limit);

  let finalSkip = (currentPage - 1) * limit;

  let viewRes = await TestimonialModel.find(searchObj)
    .skip(finalSkip)
    .limit(limit);

  let obj = {
    status: 1,
    msg: "Testimonial View",
    viewRes,
    staticPath,
    totalPages,
    limit
  };
  res.send(obj);
};

let testimonialChangeStatus = async (req, res) => {
  let { ids } = req.body;

  let arr = await TestimonialModel.find({ _id: ids });

  for (let item of arr) {
    await TestimonialModel.updateOne(
      { _id: item._id },
      { $set: { testimonialStatus: !item.testimonialStatus } },
    );
  }

  obj = {
    status: 1,
    msg: "Testimonial Status Changed",
  };
  res.send(obj);
};

let testimonialMultiDelete = async (req, res) => {
  let { ids } = req.body;

  let arr = await TestimonialModel.find({ _id: ids }).select(
    "testimonialImage",
  );

  for (let item of arr) {
    let deletePath = "uploads/testimonial/" + item["testimonialImage"];
    fs.unlinkSync(deletePath);
  }

  let deleteRes = await TestimonialModel.deleteMany({ _id: ids });

  let obj = {
    status: 1,
    msg: "Testimonial Deleted",
    deleteRes,
  };
  res.send(obj);
};

let testimonialSingleView = async (req, res) => {
  let { id } = req.params;

  let viewRes = await TestimonialModel.findOne({ _id: id });
  let path = process.env.TESTIMONIALIMAGEPATH;

  let obj = {
    status: 1,
    msg: "Testimonial Data Found",
    viewRes,
    path,
  };
  res.send(obj);
};

let testimonialUpdate = async (req, res) => {
  let { id } = req.params;
  let {
    testimonialName,
    testimonialDesignation,
    testimonialRating,
    testimonialOrder,
    testimonialMessage,
  } = req.body;

  let newObj = {
    testimonialName,
    testimonialDesignation,
    testimonialRating,
    testimonialOrder,
    testimonialMessage,
  };

  let obj;

  try {
    let oldData = await TestimonialModel.findOne({ _id: id });
    console.log(oldData)
    if (req.file && req.file.filename) {
      newObj.testimonialImage = req.file.filename;
      console.log(newObj["testimonialImage"])
    }

      if (oldData.testimonialImage) {
        let deletePath = "uploads/testimonial/" + oldData.testimonialImage;
        console.log(deletePath)
        if (fs.existsSync(deletePath)) {
          fs.unlinkSync(deletePath);
        }
      }
    

    let updateRes = await TestimonialModel.updateOne(
      { _id: id },
      { $set: newObj },
    );

    obj = {
      status: 1,
      msg: "Testimonial Data Updated",
      updateRes,
    };
  } catch (e) {
    obj = {
      status: 0,
      msg: e,
    };
  }
  res.send(obj);
};

module.exports = {
  testimonialInsert,
  testimonialView,
  testimonialChangeStatus,
  testimonialMultiDelete,
  testimonialSingleView,
  testimonialUpdate,
};

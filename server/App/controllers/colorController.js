const { colorModel } = require("../models/colorModels");

let colorInsert = async (req, res) => {
  let { colorName, pickedColor, colorOrder} = req.body;
  console.log("backend colorCode: "+pickedColor)
  let obj;
  try {
    let insertColorObj = {
      colorName,
      pickedColor,
      colorOrder,
      colorStatus: true,
    };

    console.log(insertColorObj)

    let colorRes = await colorModel.insertOne(insertColorObj);

    obj = {
      status: 1,
      msg: "Color Inserted",
      colorRes,
    };
    res.send(obj);
  } catch (error) {
    obj = {
      status: 0,
      error,
    };
    res.send(obj);
  }
};

let colorView = async (req, res) => {
  let limit = 4
  let {colorName, colorCode, colorOrder, currentPage} = req.query;
  // console.log(colorName, colorCode, colorOrder)
  let searchObj = {

  }

  if(colorName!=""){
    searchObj["colorName"] = {$regex: colorName, $options: "si"}
  }

  if(colorCode!=""){
    searchObj["colorCode"] = {$regex: colorCode, $options: "si"}
  }

  if(colorOrder!=null){
    searchObj["colorOrder"] = Number(colorOrder)
  }
  
  let totalRecords = await colorModel.find(searchObj)
  let totalPages = Math.ceil(totalRecords.length/limit)

  let finalSkip = (currentPage-1)*limit 

  let colorRes = await colorModel.find(searchObj).skip(finalSkip).limit(limit);
  let obj = {
    status: 1,
    colorRes,
    totalPages,
    limit
  };
  res.send(obj);
};

let colorDelete = async (req, res) => {
  let { id } = req.params;
  let colorRes = await colorModel.deleteOne({ _id: id });
  let obj = {
    status: 1,
    msg: "Color Deleted",
    colorRes,
  };
  res.send(obj);
};

let colorMultiDel = async(req,res)=>{
    let {ids} = req.body
    let colorRes = await colorModel.deleteMany({_id:ids})
    let obj = {
        status:1,
        msg: "Deleted Many Color",
        colorRes
    }
    res.send(obj)
}

let changeStatus = async(req,res)=>{
  let {ids} = req.body;
  let array = await colorModel.find({_id: ids})
  for(let items of array){
    await colorModel.updateOne({_id: items._id},{$set:{colorStatus:!items.colorStatus}})
  }
  let obj = {
    status: 1,
    msg: "Status Changed Successfully",
  }
  res.send(obj)
}

let colorUpdate = async(req, res) => {
    let {id} = req.params;
    let {colorName, pickedColor, colorOrder, colorStatus} = req.body;

    let updateColor = {
        colorName,
        pickedColor,
        colorOrder,
        colorStatus
    }
    let colorRes = await colorModel.updateOne({_id: id},{$set: updateColor})
  let obj = {
    status: 1,
    msg: "Color Updated",
    colorRes
  };
  res.send(obj);
};

let singleColor = async(req,res)=>{
    let {id}= req.params;
    let colorRes = await colorModel.findOne({_id:id})
    let obj = {
        status: 1,
        msg: "Single Color",
        colorRes
    }
    res.send(obj)
}

module.exports = { colorInsert, colorView, colorDelete, colorUpdate,colorMultiDel,singleColor, changeStatus };

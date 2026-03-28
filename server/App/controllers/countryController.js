const { countryModel } = require("../models/countryModels");

let countryInsert = async (req, res) => {
  let { countryName, countryOrder } = req.body;

  let obj;

  try {
    let insertCountry = {
      countryName,
      countryOrder,
      countryStatus: true,
    };

    let insertRes = countryModel.insertOne(insertCountry);

    obj = {
      status: 1,
      msg: "Country Inserted",
      insertRes,
    };
    res.send(obj);
    
  } catch (error) {
    
    obj = {
      status: 0,
      msg: error,
    };
    res.send(obj);
  }
}

let countryView = async(req,res)=>{
  let limit = 3
  let {countryName,countryCode,currentPage} = req.query
  // console.log(countryName)
  let searchObj = {}

  if(countryName!=""){
    searchObj["countryName"] = {$regex: countryName, $options: "si"}
  }

  if(countryCode!=null){
    searchObj["countryCode"] = Number(countryCode)
  }

  let totalRecords = await countryModel.find(searchObj)
  // let totalPages = Math.ceil(totalRecords.length/limit)*currentPage
  let totalPages = Math.ceil(totalRecords.length/limit)
  console.log(totalPages)

  let finalSkip = (currentPage-1)*limit

  let dataView = await countryModel.find(searchObj).skip(finalSkip).limit(limit)
  let obj = {
    status:1,
    msg: "Country Viewed",
    totalPages,
    limit,
    dataView
  }
  res.send(obj)
}

let countryDelete = async(req,res)=>{
  let {id} = req.params
  let delRes= await countryModel.deleteOne({_id:id})
  let obj = {
    status:1,
    msg: "Country Deleted",
    delRes
  }
  res.send(obj)
}

let countryUpdate = async(req,res)=>{
  let {id} = req.params;
  let {countryName, countryOrder} = req.body;
  let updtObj = {
    countryName,
    countryStatus: true,
    countryOrder
  }
  let updtRes = await countryModel.updateOne({_id:id},{$set:updtObj})
  let obj = {
    status: 1,
    msg: "Country Updated",
    updtRes
  }
  res.send(obj)
}

let singleCountry = async(req,res)=>{

  let {id} = req.params;
  let singleRes = await countryModel.findOne({_id: id})

  let obj = {
    status:1,
    msg: "Single Country",
    singleRes
  }
  res.send(obj)
}

let countryMultiDelete = async(req,res)=>{
  let {ids} = req.body;
  let multiDel = await countryModel.deleteMany({_id:ids});
  let obj = {
    status: 1,
    msg: "Country Multi Delete",
    multiDel
  }
  res.send(obj)
}

let countryChangeStatus = async(req,res)=>{
  let {ids} = req.body;
  // console.log(ids)
  let array = await countryModel.find({_id: ids})
  // console.log(array)
  for(let items of array){
    await countryModel.updateOne({_id:items._id},{$set:{countryStatus: !items.countryStatus}})
  }
  let obj = {
    status: 1,
    msg: "Status changed successfully",
  }
  res.send(obj);
}

module.exports = { countryInsert, countryView, countryDelete, countryUpdate, countryMultiDelete,countryChangeStatus, singleCountry };

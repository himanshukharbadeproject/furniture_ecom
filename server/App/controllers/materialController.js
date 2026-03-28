const { materialModel } = require("../models/materialModels");

let materialInsert = async (req, res) => {
  let { materialName, materialOrder } = req.body;
  let obj;

  try {
    let insertMaterial = {
      materialName,
      materialStatus: true,
      materialOrder,
    };

    let insertRes = await materialModel.insertOne(insertMaterial);

    obj = {
      status: 1,
      msg: "Material Inserted",
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
};

let materialView = async(req,res)=>{

  let {currentPage} = req.query
  let limit = 5

  let searchObj = {

  }

  if(req.query.materialName!=""){
    // searchObj["materialName"] = new RegExp(req.query.materialName,"i");  //javascript
    searchObj["materialName"] = {$regex: req.query.materialName, $options: "si"}   // mongoDb
  }

  if(req.query.materialOrder){
    searchObj["materialOrder"] = Number(req.query.materialOrder)
  }

  let finalSkip = (currentPage-1)*limit

    let totalViewRes = await materialModel.find(searchObj)
    let totalPages = Math.ceil(totalViewRes.length/limit)

    let viewRes = await materialModel.find(searchObj).skip(finalSkip).limit(limit)

    let obj = {
        status:1,
        msg: "Material Viewed",
        totalPages: totalPages,
        viewRes,
        limit
    }
    res.send(obj)
}

let materialDelete = async(req,res)=>{
    let {id} = req.params;

    let deleteRes = await materialModel.deleteOne({_id: id})

    let obj = {
        status:1,
        msg: "Material Deleted",
        deleteRes
    }
    res.send(obj)
}

let materialUpdate = async(req,res)=>{
    let {id} = req.params
    let { materialName, materialOrder, materialStatus } = req.body;

    let updateMaterial = {
        materialName,
        materialStatus: materialStatus,
        materialOrder
    }

    let updateRes = await materialModel.updateOne({_id:id},{$set: updateMaterial})

    let obj = {
        status:1,
        msg: "Material Updated",
        updateRes
    }
    res.send(obj)
}

let materialMultiDel = async(req,res)=>{
    let {ids} = req.body;

    console.log(ids)

    let multidelRes = await materialModel.deleteMany({_id:ids})

    let obj = {
        status:1,
        msg: "Material Multi Delete",
        multidelRes
    }
    res.send(obj)
}

let materialSingleView = async(req,res)=>{
    let {id} = req.params
    console.log(id)
    let singleMaterialRes = await materialModel.findOne({_id:id})

    let obj = {
        status:1,
        msg: "Material Single View",
        singleMaterialRes
    }
    res.send(obj)
}

let materialChangeStatus= async(req,res)=>{
  let {ids} = req.body;
  let array = await materialModel.find({_id:ids}).select('materialStatus')
  // console.log(array)
  for(let items of array){
    await materialModel.updateOne({_id:items._id},{$set: {materialStatus: !items.materialStatus}})    
  }

  console.log(array)

  let obj = {
        status:1,
        msg: "Material Change Status",
    }
    res.send(obj)
}

module.exports = { materialInsert,materialView, materialDelete, materialUpdate,materialMultiDel, materialSingleView, materialChangeStatus};

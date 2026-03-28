const { FaqModel } = require("../models/FaqModels");

let faqInsert = async (req, res) => {
  let { question, answer, faqOrder } = req.body;
  let obj;
  try {
    let inserObj = {
      question,
      answer,
      faqOrder,
      faqStatus: true,
    };

    let insertRes = await FaqModel.insertOne(inserObj);

    obj = {
      status: 1,
      msg: "FAQ Inserted",
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

let faqView = async (req, res) => {

  let limit = 3

  let {faqQuestion,faqAnswer,faqOrder,currentPage} = req.query
  let searchObj = {}

  if(faqQuestion!=""){
    searchObj["question"] = {$regex: faqQuestion, $options: "si"}
  }

  if(faqAnswer!=""){
    searchObj["answer"] = {$regex: faqAnswer, $options: "si"}
  }

  if(faqOrder!=null){
    searchObj["faqOrder"] = Number(faqOrder)
  }

  let totalRecords = await FaqModel.find(searchObj)
  let totalPages = Math.ceil(totalRecords.length/limit)
  console.log(totalPages)

  let finalSkip = (currentPage-1)*limit

  let viewRes = await FaqModel.find(searchObj).skip(finalSkip).limit(limit);
  let obj = {
    status: 1,
    msg: "FAQ View",
    totalPages,
    limit,
    viewRes
  };
  res.send(obj);
};

let faqDelete = async (req, res) => {
    let {id} = req.params;

    let deleteRes = await FaqModel.deleteOne({_id: id})
  let obj = {
    status: 1,
    msg: "FAQ Delete",
    deleteRes
  };
  res.send(obj);
};

let faqUpdate = async(req, res) => {
    let {id} = req.params;
    let { question, answer, faqOrder } = req.body;

    let updateObj = {
      question,
      answer,
      faqOrder,
      faqStatus: true,
    };

    let updateRes = await FaqModel.updateOne({_id:id},{$set:updateObj})

  let obj = {
    status: 1,
    msg: "FAQ Update",
    updateRes
  };
  res.send(obj);
};

let faqMultiDel = async(req,res)=>{
  let {ids} = req.body;
  let multidelRes = await FaqModel.deleteMany({_id:ids})
  let obj = {
    status: 1,
    msg: "FAQ Multi Delete",
    multidelRes
  };
  res.send(obj);
}

let singleFaq = async(req,res)=>{
let {id} = req.params;

let singleData = await FaqModel.findOne({_id:id})

  let obj = {
    status:1,
    msg: "Single Faq Data",
    singleData
  }
  res.send(obj)
}

let changeStatus = async(req,res)=>{
  let {ids} = req.body
  let array = await FaqModel.find({_id:ids})
  for(let items of array){
    await FaqModel.updateOne({_id:ids},{$set:{faqStatus: !items.faqStatus}})
  }
  let obj = {
    status: 1,
    msg: "Change Update Successfully"
  }
  res.send(obj)
}

module.exports = { faqInsert, faqView, faqDelete, faqUpdate, faqMultiDel, changeStatus, singleFaq };

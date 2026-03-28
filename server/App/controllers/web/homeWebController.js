const { productModel } = require("../../models/productModels")
const { SliderModel } = require("../../models/sliderModels")

let SliderWebView = async(req, res)=>{
    let sliderRes = await SliderModel.find()
    let staticImagePath = process.env.SLIDERIMAGEPATH

    let obj = {
        status: 1,
        sliderRes,
        staticImagePath
    }

    res.send(obj)
}

let ThreeSections = async(req, res)=>{
    let {productType} = req.query
    let limit = 4
    console.log(req.query)
    let sectionRes = await productModel.find({productType: productType}).limit(limit).populate('productSubSubCategory','subSubCategoryName').populate("productColor", "pickedColor")
    // let sectionRes = await productModel.find()
    let staticImagePath = process.env.PRODUCTIMAGEPATH

    let obj = {
        status: 1,
        sectionRes,
        staticImagePath
    }
    res.send(obj)
}

let BestSellingView = async(req, res)=>{
    let bestSellingRes = await productModel.find({productBestSelling: true})
    let productImagePath = process.env.PRODUCTIMAGEPATH

    let obj = {
        status: 1,
        bestSellingRes,
        productImagePath
    }

    res.send(obj)
}

module.exports = {SliderWebView, ThreeSections, BestSellingView}
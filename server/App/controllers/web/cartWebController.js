const { cartModel } = require("../../models/cartModels");
const { countryModel } = require("../../models/countryModels");

let addToCart = async (req, res) => {
  let { color, price, qty, title, image, pid, userId } = req.body;

  let checkProductInCart = await cartModel.findOne({ pid, color, userId });
  let resObj;

  if (checkProductInCart) {
    resObj = {
      status: 0,
      msg: "Item Already Exist In Cart",
    };
  } else {
    let obj = {
      color,
      pid,
      image,
      price,
      qty,
      title,
      userId, 
    };

    let cart = await cartModel.create(obj);

    resObj = {
      status: 1,
      msg: "Item Inserted In Cart",
      cart,
    };
  }

  res.send(resObj);
};

let viewCart = async(req, res)=>{
  let {userId} = req.body

  let cart = await cartModel.find({userId}).populate("color","colorName pickedColor")

  let staticImagePath = process.env.PRODUCTIMAGEPATH

  let obj = {
    status: 1,
    msg: "Cart Data Found",
    cart,
    staticImagePath
  }

  res.send(obj)
}

let deleteCartItem = async(req, res)=>{
  
  let {id} = req.params
  console.log(req.params)
  let cart = await cartModel.deleteOne({_id: id})

  let obj = {
    status: 1,
    msg: "Item Deleted from Cart",
    cart
  }

  res.send(obj)
}

let updateQty = async (req, res) => {
  try {
    let { id } = req.params;
    let { action } = req.body;
    // let userId = req.user.id; // from token

    let updateOperation;

    if (action === "inc") {
      updateOperation = { $inc: { qty: 1 } };
    } else if (action === "dec") {
      // First check current qty
      // let product = await cartModel.findOne({ _id: id, userId });
      let product = await cartModel.findOne({ _id: id });

      if (!product) {
        return res.send({ status: 0, msg: "Item not found" });
      }

      if (product.qty <= 1) {
        return res.send({
          status: 0,
          msg: "Minimum quantity is 1"
        });
      }

      updateOperation = { $inc: { qty: -1 } };
    } else {
      return res.send({
        status: 0,
        msg: "Invalid action"
      });
    }

    // let updatedCart = await cartModel.findOneAndUpdate(
    //   { _id: id, userId }, // 🔐 secure
    //   updateOperation,
    //   { new: true }
    // );
    let updatedCart = await cartModel.findOneAndUpdate(
      { _id: id }, // 🔐 secure
      updateOperation,
      { new: true }
    );

    res.send({
      status: 1,
      msg: "Quantity updated",
      updatedCart
    });

  } catch (error) {
    res.send({
      status: 0,
      msg: "Server error",
      error: error.message
    });
  }
};

let getCountry = async(req, res)=>{
  let country = await countryModel.find()
  
  let obj = {
    status: 1,
    country
  }

  res.send(obj)
}

module.exports = { addToCart, viewCart, deleteCartItem, updateQty, getCountry};

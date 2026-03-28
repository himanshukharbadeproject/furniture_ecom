const { cartModel } = require("../../models/cartModels");
const { orderModel } = require("../../models/orderModels");
const Razorpay = require("razorpay");
const crypto = require("crypto");
let instance = new Razorpay({
  key_id: "rzp_test_SUUxsHT7JSFJu7",
  key_secret: "47SB7FrcWYtAEL5pZjtcw7zS",
});

let orderSave = async (req, res) => {
  console.log(req.body);
  let { PaymentMethod } = req.body;
  let objRes;
  let obj = { ...req.body };

  if (PaymentMethod == "1") {
    // online payment
    obj["orderStatus"] = "pending";
    obj["paymentStatus"] = "1";
    let orderData = await orderModel.create(obj);

    let orderObj = {
      amount: req.body.orderAmount * 100,
      currency: "INR",
      receipt: orderData._id,
    };

    let orderRes = await instance.orders.create(orderObj);

    await orderModel.updateOne(
      { _id: orderData._id },
      { $set: { razorpayOrderId: orderRes.id } },
    );

    objRes = {
      status: 1,
      orderRes,
      PaymentMethod,
      msg: "Online in Processing...",
    };
  } else {
    obj["orderStatus"] = "process";
    try {
      await orderModel.create(obj);
      await cartModel.deleteMany({ userId: obj.userId });

      objRes = {
        status: 1,
        msg: "Order Save Successfully",
      };
    } catch (e) {
      objRes = {
        status: 0,
        msg: e.message,
      };
    }
  }
  res.send(objRes);
};

let verifyOrder = async (req, res) => {
  let { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } =
    req.body;

  const hmac = crypto.createHmac("sha256", "47SB7FrcWYtAEL5pZjtcw7zS");
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature == razorpay_signature) {
    await cartModel.deleteMany({ userId: userId });

    let updateOrder = await orderModel.updateOne(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          paymentStatus: "2",
          orderStatus: "process",
          razorpayPayment: razorpay_payment_id,
        },
      },
    );

    // mail

    objRes = {
      status: 1,
      msg: "Payment Success",
    };
  } else {
    objRes = {
      status: 0,
      msg: "Payment UnSuccessfully",
    };
  }

  res.send(objRes);
};

module.exports = { orderSave, verifyOrder };

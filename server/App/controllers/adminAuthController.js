const { transporter } = require("../config/mailConfig");
const { AdminAuthModel } = require("../models/adminAuthModels");
let myOTP = new Map()

let adminLogin = async (req, res) => {
  let checkAdmin = await AdminAuthModel.findOne(req.body);
  let resObj;
  if (checkAdmin) {
    resObj = {
      status: 1,
      adminID: checkAdmin._id,
      msg: "Login Successful",
    };
  } else {
    resObj = {
      status: 0,
      msg: "Invalid Username & Password",
    };
  }
  res.send(resObj);
};

let sendOtp = async (req, res) => {
    console.log(req.body)
  let { email } = req.body;
  console.log(email)
  let checkAdmin = await AdminAuthModel.findOne({adminEmail: email });
  let resObj;
  if (checkAdmin) {

    let otp = Math.floor(Math.random()*999999999).toString().slice(0,6)
    myOTP.set("MYOTP",otp)

    const info = await transporter.sendMail({
      from: '"Forgot Password OTP" <kharbadeh@gmail.com>',
      to: email,
      subject: "OTP Mail | Forgot Password",
      text: "OTP Mail", // Plain-text version of the message
      html: `<b>OTP: ${otp}</b>`, // HTML version of the message
    });

    resObj = {
      status: 1,
      msg: "OTP send Successfully",
    };
  } else {
    resObj = {
      status: 0,
      msg: "Invalid email & password",
    };
  }
  res.send(resObj)
};

let verifyOTP = async(req,res)=>{
    
    let {otp} = req.body
    console.log(otp)
    let resObj
    let backendOTP = myOTP.get("MYOTP")
    console.log(backendOTP)
    if(otp===backendOTP){
        resObj = {
            status: 1,
            msg: "Otp Verified Successfully"
        }
    }
    else{
        resObj = {
            status: 0,
            msg: "Invalid Otp"
        }
    }

    res.send(resObj)
}

let resetPassword = async (req, res) => {
    let { npass, cpass, email } = req.body;
    let resObj;
    console.log(email)

    if (npass !== cpass) {
        return res.send({
            status: 0,
            msg: "Passwords do not match"
        });
    }

    // let data = await AdminAuthModel.findOne({adminEmail: email})
    let checkAdmin = await AdminAuthModel.findOne({adminEmail: email });
    console.log(checkAdmin)

    let result = await AdminAuthModel.updateOne(
        { adminEmail: email },
        { $set: { adminPassword: npass } }
    );

    console.log(result);

    if (result.matchedCount === 0) {
        resObj = {
            status: 0,
            msg: "Email not found"
        };
    }
    else if (result.modifiedCount === 0) {
        resObj = {
            status: 0,
            msg: "Password already same or not updated"
        };
    }
    else {
        resObj = {
            status: 1,
            msg: "New Password Updated Successfully"
        };
    }

    res.send(resObj);
};

let changePassword = async(req,res)=>{

  let {CurrentPassword, NewPassword, adminId} = req.body

  console.log(CurrentPassword, NewPassword, adminId)

  let check = await AdminAuthModel.findOne({_id: adminId},{adminPassword: CurrentPassword})
  let resObj

  if(check){
    let result = await AdminAuthModel.updateOne({_id: adminId},{$set: {adminPassword: NewPassword}})
    if(result){
      resObj = ({
        status: 1,
        msg: "Password changed successfully",
        result
      })
    }
    else{
      resObj = ({
        status: 0,
        msg: "Couldn't change password",
        result
      })
    }
  }

  res.send(resObj)
}


module.exports = { adminLogin, sendOtp, verifyOTP, resetPassword, changePassword};

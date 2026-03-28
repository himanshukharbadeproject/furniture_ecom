const bcrypt = require("bcrypt");
const { userModel } = require("../../models/userModels");
const saltRounds = 10;
let jwt = require("jsonwebtoken");

let register = async (req, res) => {
  console.log(req.body);
  let { userName, userEmail, userPassword, userPhone } = req.body;

  const hashPassword = await bcrypt.hashSync(userPassword, saltRounds);
  console.log(hashPassword);
  let obj;

  try {
    let insertObj = {
      userName,
      userEmail,
      userPassword: hashPassword,
      userPhone,
    };
    let userInsert = await userModel.create(insertObj);
    obj = {
      status: 1,
      msg: "User Created Successfully",
      userInsert,
    };
  } catch (e) {
    obj = {
      status: 0,
      msg: e.message,
    };
  }

  res.send(obj);
};

let login = async (req, res) => {
  // console.log(req.body)
  let { loginEmail, loginPassword } = req.body;
  let obj;

  let checkEmail = await userModel.findOne({ userEmail: loginEmail });
  if (checkEmail) {
    let dbPassword = checkEmail.userPassword;
    // console.log(bcrypt.compareSync(loginPassword, checkEmail.userPassword));
    if (bcrypt.compareSync(loginPassword, dbPassword)) {
      let user = {
        userName: checkEmail.userName,
        id: checkEmail._id,
      };
      let token = jwt.sign(user, process.env.TOKENKEY);
      obj = {
        status: 1,
        msg: "Login Successful",
        user,
        token,
      };
    } else {
      obj = {
        status: 0,
        msg: "Invalid UserPassword",
      };
    }
  } else {
    obj = {
      status: 0,
      msg: "Invalid UserEmail",
    };
  }
  res.send(obj);
};

let changePassword = async (req, res) => {
  let { userId, currentPassword, newPassword, confirmPassword } = req.body;
  console.log(req.body);
  // from userId we have taken out data of a particular user
  let checkData = await userModel.find({ _id: userId });
  // from this we have taken out password from the database
  let dbPassword = checkData[0].userPassword;
  console.log("DBPASSWORD: " + dbPassword);

  let obj;

  // here we have compared password from the database and the current password written
  if (bcrypt.compareSync(currentPassword, dbPassword)) {
    // here we have checked the confirm and new password
    if (newPassword == confirmPassword) {
      // here we have converted new password into the hashpassword for the encription purpose (i.e., security purpose)
      let hashPassword = await bcrypt.hashSync(newPassword, saltRounds);
      console.log(hashPassword);
      // here we have updated the new password in replace of current password
      let updateRes = await userModel.updateOne(
        { _id: userId },
        { $set: { userPassword: hashPassword } },
      );
      console.log("UpdateRes: " + updateRes);

      obj = {
        status: 1,
        msg: "Data updated succesfully",
        updateRes,
      };
    } else {
      obj = {
        status: 0,
        msg: "new password & confirm password are mismatched",
      };
    }
  } else {
    obj = {
      status: 0,
      msg: "invalid current Password",
    };
  }

  res.send(obj);
};

let userData = async (req, res) => {
  console.log(req.body);
  let { userId } = req.body;
  let obj;

  try {
    let viewRes = await userModel.find({ _id: userId });

    obj = {
      status: 1,
      msg: "User Data Found",
      viewRes,
    };
  } catch (e) {

    obj = {
      status: 0,
      msg: "Data couldn't Found",
    };
  }

  res.send(obj);
};

let googleLogin = async(req, res)=>{
  let {name, email, phone} = req.body

  let checkEmail = await userModel.findOne({userEmail: email})
  let objRes
  console.log(checkEmail)
  if(checkEmail){
    let user = {
      userName: checkEmail.user,
      id: checkEmail._id
    }
    let token = jwt.sign(user, process.env.TOKENKEY)
    objRes = {
      status: 1,
      msg: "Login Success",
      token,
      user
    }

  }
  else{
    let insertObj = {
      userName: name,
      userEmail: email,
      userPhone: phone,
    };
    let userInsert = await userModel.create(insertObj);

    let user = {
      userName: userInsert.user,
      id: userInsert._id
    }
    let token = jwt.sign(user, process.env.TOKENKEY)

    objRes = {
      status: 1,
      msg: "User Created Successfully",
      userInsert,
      token
    };
  }
  res.send(objRes)
}

module.exports = { register, login, changePassword, userData, googleLogin};

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function ForgetPassword() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [formId, setFormId] = useState(1)
  let [email, setEmail] = useState("")
  let navigation = useNavigate()


  let sendOTP = (event) => {
    event.preventDefault();
    // let adminEmail = event.target.email.value
    console.log(email)
    axios.post(`${apiBaseUrl}adminAuth/sendOTP`,{email}).then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        console.log(finalRes.msg)
        setFormId(2)
      }
      else{
        console.log(finalRes.msg)
      }
    })
  };

  let VerifySentOTP = (event) => {
    event.preventDefault();
    let otp = event.target.otp.value
    console.log(otp)
    axios.post(`${apiBaseUrl}adminAuth/verifyOTP`,{otp}).then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        console.log(finalRes.msg)
        setFormId(3)
      }
      else{
        console.log(finalRes.msg)
      }
    })
  };

  let resetNewPassword = (event) => {
    event.preventDefault();
    let npass = event.target.nemail.value
    let cpass = event.target.cemail.value
    console.log(email)

    let obj = {
      npass,
      cpass,
      email
    }

    axios.post(`${apiBaseUrl}adminAuth/resetPassword`,obj).then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        console.log(finalRes.msg)
        navigation("/")
      }
      else{
        console.log(finalRes.msg)
      }
    })
  };

  return (
    <div className="border w-full h-screen bg-gray-200 relative">
      {formId === 1 && (
        <form onSubmit={sendOTP}>
          <div className="h-[280px] w-[400px] shadow-[0px_0px_10px_2px_gray] absolute top-[25%] left-[35%] pt-[10px] ps-[10px]">
            <h2 className="text-black font-bold text-[25px] mb-[10px] text-center">
              Forget Password
            </h2>
            <h3 className="text-black text-[13px] mb-[30px] text-center mx-[20px]">
              Enter your email address and we'll send you a link to reset your
              password
            </h3>
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-[90%] h-[30px] ms-[15px] border ps-[10px] text-[13px] mb-[20px] rounded-[5px]"
            />
            <button className="bg-indigo-800 cursor-pointer text-white w-[90%] ms-[15px] h-[35px] border ps-[10px] text-[15px] mb-[20px] rounded-[7px] font-semibold">
              Send OTP
            </button>
            <div className="flex justify-center mb-2 me-[20px]">
              <Link
                to={"/"}
                className="text-[14px] text-indigo-600 font-semibold"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      )}
      {formId === 2 && (
        <form onSubmit={VerifySentOTP}>
          <div className="h-[280px] w-[400px] shadow-[0px_0px_10px_2px_gray] absolute top-[25%] left-[35%] pt-[10px] ps-[10px]">
            <h2 className="text-black font-bold text-[25px] mb-[5px] text-center">
              Forget Password
            </h2>
            <h3 className="text-black text-[13px] mb-[20px] text-center">
              Enter the OTP sent to your email address.
            </h3>
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              className="w-[95%] h-[30px] border ps-[10px] text-[13px] mb-[15px] rounded-[5px]"
            />
            <button className="bg-blue-700 cursor-pointer text-white w-[95%] h-[35px] border ps-[10px] text-[15px] mb-[10px] rounded-[7px] font-bold">
              Verify OTP
            </button>
            <div className="bg-green-200 text-green-800 w-[95%] h-[35px] ps-[10px] text-[15px] mb-[10px] mt-[10px] text-center rounded-[7px] font-semibold">
              OTP has been sent to your email
            </div>
            <div className="flex justify-center mb-2 me-[20px]">
              <Link
                to={"/"}
                className="text-[14px] text-indigo-600 font-semibold"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      )}
      {formId === 3 && (
        <form onSubmit={resetNewPassword}>
          <div className="h-[350px] w-[400px] shadow-[0px_0px_10px_2px_gray] absolute top-[25%] left-[35%] pt-[10px] ps-[10px]">
            <h2 className="text-black font-bold text-[25px] mb-[5px] text-center">
              Forgot Password
            </h2>
            <h3 className="text-black text-[13px] mb-[20px] text-center">
              Enter your new password
            </h3>
            <input
              type="text"
              name="nemail"
              placeholder="Enter new password"
              className="w-[95%] h-[30px] border ps-[10px] text-[13px] mb-[20px] rounded-[5px]"
            />
            <input
              type="text"
              name="cemail"
              placeholder="Confirm new password"
              className="w-[95%] h-[30px] border ps-[10px] text-[13px] mb-[25px] rounded-[5px]"
            />
            <button className="bg-blue-700 text-white w-[95%] h-[35px] ps-[10px] text-[15px] mb-[10px] rounded-[7px] font-semibold">
              Reset Password
            </button>
            <div className="bg-green-200 text-green-800 text-center w-[95%] h-[35px] ps-[10px] text-[15px] mb-[10px] mt-[20px] rounded-[7px] font-bold">
              Password set successfully
            </div>
            <div className="flex justify-center mb-2 me-[20px]">
              <Link
                to={"/"}
                className="text-[14px] text-indigo-600 font-semibold"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

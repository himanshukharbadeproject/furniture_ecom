import React, { useContext, useState } from "react";
import Header from "../../common/Header";
import { FaMobile } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { loginContext } from "../Context/MainContext";
import axios from "axios";

export default function Profile() {
  let [block, setBlock] = useState(1);
  let [error, setError] = useState('')

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  
  let {adminId} = useContext(loginContext)

  let changePassword = async(event)=>{
    event.preventDefault()
    let CurrentPassword = event.target.currentPassword.value
    let NewPassword = event.target.newPassword.value
    let ConfirmPassword = event.target.confirmPassword.value

    let obj = {
      CurrentPassword,
      NewPassword,
      adminId
    }

    if(NewPassword!=ConfirmPassword){
      setError('New Password has not matched the confirm Password')
      return
    }
    else{
      axios.post(`${apiBaseUrl}adminAuth/change-password`,obj).then((res)=>res.data).then((finalRes)=>{
        if(finalRes.status){
          console.log(finalRes.msg)
        }
        else{
          setError(finalRes.msg)
        }
      })
    }
    event.target.reset()
  }

  return (
    <div className="w-full">
      <Header />
      <div className="border-b border-gray-400 h-[50px] text-left mb-[20px]">
        <h3 className="text-[20px] text-gray-500 font-semibold ms-[25px] pt-[10px]">
          Home / Profile
        </h3>
      </div>
      <div className="mt-[30px]">
        <div className="grid grid-cols-[30%_auto] px-[25px] gap-5">
          <div className="">
            <div className="shadow-[0px_0px_10px_2px_silver]">
              <div className="h-[130px] flex justify-center">
                <div>
                  <img
                    className="h-[80px] w-[80px] rounded-[50%] mt-[20px]"
                    src="https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTJkODg3YTMwLTRlNmYtMTFlZi04MGUwLTg5MTBmNjk1YjZkZS5qcGc="
                  />
                </div>
              </div>
              <div className="h-[120px] bg-gray-100">
                <h3 className="font-bold text-[15px] pt-[10px] px-[15px] mb-[10px]">
                  Contact Information
                </h3>
                <span className="flex gap-2.5 px-[14px]">
                  <FaMobile className="mt-[5px]" />
                  9175755893
                </span>
                <span className="flex gap-2.5 px-[14px]">
                  <MdEmail className="mt-[5px]" />
                  kharbadeh@gmail.com
                </span>
              </div>
            </div>
          </div>
          <div className="border-black shadow-[0px_0px_10px_2px_silver] py-2.5 px-5">
            <div className="flex justify-start gap-2">
              <button
                onClick={() => setBlock(1)}
                className={`py-1 px-4 text-[15px] font-semibold ${block==1? 'border-b-2 border-purple-600': ' border-0'} cursor-pointer`}>
                Edit Profile
              </button>

              <button
                onClick={() => setBlock(2)}
                className={`py-1 px-4 text-[15px] font-semibold ${block==2? 'border-b-2 border-purple-600': 'border-0'} cursor-pointer`}
              >
                Change Profile
              </button>
            </div>
            <div className="py-3.5 px-5">
              {block == 1 && (
                <form>
                  <div className="w-full">
                    <div className="grid grid-cols-[40%_auto] gap-3">
                      <input type="file" className="border" />
                      <div>
                        <h3 className="font-semibold text-[14px] mb-1">Name</h3>
                        <input
                          type="text"
                          className="w-[95%] border py-0.5 ps-2.5 mb-2 text-[13px] h-[35px]"
                          placeholder="Name"
                        />
                        <h3 className="font-semibold text-[14px] mb-1">
                          Email
                        </h3>
                        <input
                          type="text"
                          className="w-[95%] border py-0.5 ps-2.5 mb-2 text-[13px] h-[35px]"
                          placeholder="Email"
                        />
                        <h3 className="font-semibold text-[14px] mb-1">
                          Mobile Number
                        </h3>
                        <input
                          type="text"
                          className="w-[95%] border py-0.5 ps-2.5 mb-2 text-[13px] h-[35px]"
                          placeholder="Mobile Number"
                        />
                      </div>
                    </div>
                    <button className="bg-purple-800 text-white text-[13px] py-1.5 px-3.5 rounded-[5px] my-5 cursor-pointer">
                      Update Profile
                    </button>
                  </div>
                </form>
              )}
              {block == 2 && (
                <form onSubmit={changePassword}>

                {error!='' && <p className="text-red-500 text-[14px] mb-2.5">{error}</p>}

                  <div className="w-full">
                    <div>
                        <h3 className="font-semibold text-[14px] mb-1">
                          Current Password
                        </h3>
                        <input
                          type="text"
                          className="w-[95%] border py-0.5 ps-2.5 mb-2 text-[13px] h-[35px]"
                          placeholder="Current Password"
                          name="currentPassword"
                        />
                        <h3 className="font-semibold text-[14px] mb-1">New Password</h3>
                        <input
                          type="text"
                          className="w-[95%] border py-0.5 ps-2.5 mb-2 text-[13px] h-[35px]"
                          placeholder="New Password"
                          name="newPassword"
                        />
                        <h3 className="font-semibold text-[14px] mb-1">
                          Confirm Password
                        </h3>
                        <input
                          type="text"
                          className="w-[95%] border py-0.5 ps-2.5 mb-2 text-[13px] h-[35px]"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                        />
                      </div>
                    <button className="bg-purple-800 text-white text-[13px] py-1.5 px-3.5 rounded-[5px] my-5 cursor-pointer">
                      Change Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

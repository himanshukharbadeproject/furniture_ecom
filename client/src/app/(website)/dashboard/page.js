"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashBoard() {
  let [tab, setTab] = useState(1);
  let token = useSelector((store) => store.login.token);
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
  let [userData, setUserData] = useState([]);

  let changePassword = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);
    console.log(token);
    axios
      .post(`${apiBaseUrl}user/change-password`, formValue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    getProfileData();
  }, []);

  let getProfileData = () => {
    // you can take either post or get to fetch the data
    axios
      .post(
        `${apiBaseUrl}user/profile-data`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.viewRes)
        setUserData(finalRes.viewRes);
      });
  };

  return (
    <div className="w-full bg-white">
      <h2 className="text-black font-medium text-center text-[32px] pt-[10px]">
        My Dashboard
      </h2>
      <h3 className="text-yellow-600 font-medium text-center text-[15px] mt-[5px]">
        Home {">"} Dashboard
      </h3>
      <div className="grid grid-cols-[25%_auto] mx-auto mt-[10px] py-[20px] w-[1320px] pt-[20px] gap-[20px] border-gray-200 border-b border-t">
        <div className="">
          <div className="flex-col w-full">
            <div
              onClick={() => setTab(1)}
              className={`${tab == 1 ? "bg-amber-400" : "bg-black"} text-[16px] text-white h-[40px] px-[10px] py-[8px] my-[8px] hover:bg-amber-400 cursor-pointer rounded-[5px]`}
            >
              My Dashboard
            </div>
            <div
              onClick={() => setTab(2)}
              className={`${tab == 2 ? "bg-amber-400" : "bg-black"} text-[16px] text-white h-[40px] px-[10px] py-[8px] my-[8px] hover:bg-amber-400 cursor-pointer rounded-[5px]`}
            >
              Orders
            </div>
            <div
              onClick={() => setTab(3)}
              className={`${tab == 3 ? "bg-amber-400" : "bg-black"} text-[16px] text-white h-[40px] px-[10px] py-[8px] my-[8px] hover:bg-amber-400 cursor-pointer rounded-[5px]`}
            >
              Address
            </div>
            <div
              onClick={() => setTab(4)}
              className={`${tab == 4 ? "bg-amber-400" : "bg-black"} text-[16px] text-white h-[40px] px-[10px] py-[8px] my-[8px] hover:bg-amber-400 cursor-pointer rounded-[5px]`}
            >
              My Profile
            </div>
            <div
              onClick={() => setTab(5)}
              className={`${tab == 5 ? "bg-amber-400" : "bg-black"} text-[16px] text-white h-[40px] px-[10px] py-[8px] my-[8px] hover:bg-amber-400 cursor-pointer rounded-[5px]`}
            >
              Change Password
            </div>
            <div
              onClick={() => setTab(6)}
              className={`${tab == 6 ? "bg-amber-400" : "bg-black"} text-[16px] text-white h-[40px] px-[10px] py-[8px] my-[8px] hover:bg-amber-400 cursor-pointer rounded-[5px]`}
            >
              Logout
            </div>
          </div>
        </div>
        <div className="text-black">
          {tab == 1 && (
            <div className="h-full w-full ">
              <h3 className="text-[18px] font-medium">My DashBoard</h3>
              <p className="text-[15px] mt-[5px]">
                A dashboard (also called dash, instrument panel or IP, or
                fascia) is a control panel set within the central console of a
                vehicle, boat, or cockpit of an aircraft or spacecraft.
              </p>
            </div>
          )}
          {tab == 2 && (
            <div className="h-full w-full">
              <h3 className="text-[18px] font-medium">Orders</h3>
              <p className="text-[15px] mt-[5px]">
                A dashboard (also called dash, instrument panel or IP, or
                fascia) is a control panel set within the central console of a
                vehicle, boat, or cockpit of an aircraft or spacecraft.
              </p>
            </div>
          )}
          {tab == 3 && (
            <div className="h-full w-full ">
              <h3 className="text-[18px] font-medium">Address</h3>
              <p className="text-[15px] mt-[5px]">
                A dashboard (also called dash, instrument panel or IP, or
                fascia) is a control panel set within the central console of a
                vehicle, boat, or cockpit of an aircraft or spacecraft.
              </p>
            </div>
          )}
          {tab == 4 && (
            <div className="h-full w-full ">
              <h3 className="text-[18px] font-medium">My Profile</h3>
              <form
                // onSubmit={}
                className="border border-amber-600 py-[10px] px-[10px]"
              >
                <div className="flex gap-5 my-1.5">
                  <div className="flex gap-1">
                    <input type="radio" 
                    checked={userData[0]?.userGender == 1}
                    name="userGender" value={1} />
                    <h3 className="text-[13px] mb-[5px] font-semibold mt-[5px]">
                      Mr.
                    </h3>
                  </div>
                  <div className="flex gap-1">
                    <input type="radio" 
                    checked={userData[0]?.userGender == 2}
                    name="userGender" value={2} />
                    <h3 className="text-[13px] mb-[5px] font-semibold mt-[5px]">
                      Mrs.
                    </h3>
                  </div>
                </div>
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  Name
                </h3>
                <input
                  type="text"
                  name="userName"
                  defaultValue={userData[0]?.userName}
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  Email
                </h3>
                <input
                  type="email"
                  name="userEmail"
                  defaultValue={userData[0]?.userEmail}
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  Mobile Number
                </h3>
                <input
                  type="phone"
                  name="userPhone"
                  defaultValue={userData[0]?.userPhone}
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  Address
                </h3>
                <input
                  type="text"
                  name="userAddress"
                  defaultValue={userData[0]?.userAddress}
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <div className="flex justify-end">
                  <button className="py-[8px] px-[13px] bg-amber-400 rounded-[7px] text-[13px] text-white cursor-pointer font-semibold">
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}
          {tab == 5 && (
            <div className="h-full w-full text-black px-[10px]">
              <h3 className="text-[18px] font-bold pt-[10px]">
                Change Password
              </h3>
              <form
                onSubmit={changePassword}
                className="border border-amber-600 py-[10px] px-[10px]"
              >
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  Current Password
                </h3>
                <input
                  type="password"
                  name="currentPassword"
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  New Password
                </h3>
                <input
                  type="password"
                  name="newPassword"
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <h3 className="text-[13px] mb-[5px] font-semibold mb-[5px]">
                  Confirm Password
                </h3>
                <input
                  type="password"
                  name="confirmPassword"
                  className="h-[30px] border-black border w-full px-[10px] text-[12px] mb-[10px]"
                />
                <div className="flex justify-end">
                  <button className="py-[8px] px-[13px] bg-amber-400 rounded-[7px] text-[13px] text-white cursor-pointer font-semibold">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          )}
          {tab == 6 && (
            <div className="h-full w-full">
              <h3 className="text-[18px] font-medium">Logout</h3>
              <p className="text-[15px] mt-[5px]">
                A dashboard (also called dash, instrument panel or IP, or
                fascia) is a control panel set within the central console of a
                vehicle, boat, or cockpit of an aircraft or spacecraft.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

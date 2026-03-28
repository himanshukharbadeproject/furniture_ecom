import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Header from "../../common/Header";

export default function Dashboard() {
  return (
    <div className="w-full">
          <div>
            <Header/>
            <div className="border-b-[3px] border-gray-300">
              <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">Home /  Dashboard</h2>
            </div>
            <div className="grid grid-cols-3 gap-[20px] mt-[20px] mx-[70px]">
              <div className="bg-purple-500 h-[150px] rounded-[5px]">
                <div className="flex flex-col text-left ml-[20px] text-white">
                  <div className="flex justify-between items-center ">
                    <h3 className="font-bold"><span className="text-[25px]">26K</span>(-12.4% ↓)</h3>
                     <BsThreeDotsVertical className="mr-[10px]"/>
                    </div>
                  <h4 className="font-bold text-[22px]">Users</h4>
                </div>
              </div>
              <div className="bg-red-500 h-[150px] rounded-[5px]">
                <div className="flex flex-col text-left ml-[20px] text-white">
                  <div className="flex justify-between items-center ">
                    <h3 className="font-bold"><span className="text-[25px]">26K</span>(-12.4% ↓)</h3>
                     <BsThreeDotsVertical className="mr-[10px]"/>
                    </div>
                  <h4 className="font-bold text-[22px]">Users</h4>
                </div>
              </div>
              <div className="bg-yellow-500 h-[150px] rounded-[5px]">
                <div className="flex flex-col text-left ml-[20px] text-white">
                  <div className="flex justify-between items-center ">
                    <h3 className="font-bold"><span className="text-[25px]">26K</span>(-12.4% ↓)</h3>
                     <BsThreeDotsVertical className="mr-[10px]"/>
                    </div>
                  <h4 className="font-bold text-[22px]">Users</h4>
                </div>
              </div>
              <div className="bg-green-500 h-[150px] rounded-[5px]">
                <div className="flex flex-col text-left ml-[20px] text-white">
                  <div className="flex justify-between items-center ">
                    <h3 className="font-bold"><span className="text-[25px]">26K</span>(-12.4% ↓)</h3>
                     <BsThreeDotsVertical className="mr-[10px]"/>
                    </div>
                  <h4 className="font-bold text-[22px]">Users</h4>
                </div>
              </div>
            </div>
          </div>
        
    </div>
  );
}

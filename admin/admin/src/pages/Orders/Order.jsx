import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Header from "../../common/Header";

export default function Order() {
  return (
          <div className="border">
            <Header/>
            <div className="border-b-[3px] border-gray-300">
              <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
                Home / Orders
              </h2>
            </div>
            <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
              <h3 className="font-medium text-[25px]">Order's List</h3>
              <div className="flex gap-[10px]">
                <div className="bg-blue-600 p-[5px] rounded-[50%]">
                  <FaFilter className="text-white text-[19px] mt-[7px] mx-[10px]" />
                </div>
                <button className="text-white bg-green-600 text-[16px] rounded-[10px] p-[10px] font-medium px-[15px]">
                  Change Status
                </button>
                <button className="text-white bg-red-600 p-[10px] rounded-[10px] px-[15px] font-medium ">
                  Delete
                </button>
              </div>
            </div>
            <table className="mx-[20px] text-black w-[96.7%] text-left border-collapse">
              {/* Define column widths once here */}
              <colgroup>
                <col className="w-[10%] "/> {/* Checkbox */}
                <col className="w-[10%] " /> {/* Name */}
                <col className="w-[10%] " /> {/* Email */}
                <col className="w-[20%] " /> {/* Name */}
                <col className="w-[10%] " /> {/* Mobile */}
                <col className="w-[10%] " /> {/* Status */}
                <col className="w-[10%] " /> {/* Action */}
                <col className="w-[10%] " /> {/* Action */}
                <col className="w-[10%] " /> {/* Action */}
              </colgroup>

              <thead className="font-bold">
                <tr>
                  <th className="border border-white text-[15px] p-2">
                    <button className="p-2 bg-blue-600 rounded-[5px]">Delete</button>
                  </th>
                  <th className="border border-white text-[15px]">S.NO.</th>
                  <th className="border border-white text-[15px]">ORDER ID</th>
                  <th className="border border-white text-[15px]">NAME</th>
                  <th className="border border-white text-[15px]">QUANTITY</th>
                  <th className="border border-white text-[15px]">PRICE</th>
                  <th className="border border-white text-[15px]">DATE</th>
                  <th className="border border-white text-[15px]">STATUS</th>
                  <th className="border border-white text-[15px]">VIEW</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border border-black">
                  <td className=" p-4">
                    <input type="checkbox" className="ms-[8px]"/>
                  </td>
                  <td className="border border-black">1</td>
                  <td className="border border-black">Frank01</td>
                  <td className="border border-black">Roshan Chaurasia</td>
                  <td className="border border-black">2</td>
                  <td className="border border-black">Rs. 3500</td>
                  <td className="border border-black">10/06/2025</td>
                  <td className="border border-black">Processing...</td>
                  <td className="border border-black"><button className="rounded-[10px] border border-black py-[3px] px-[10px]">View</button></td>
                  
                </tr>
              </tbody>
            </table>
          </div>
  );
}


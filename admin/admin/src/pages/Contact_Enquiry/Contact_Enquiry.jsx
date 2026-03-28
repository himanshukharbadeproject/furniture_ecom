import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Header from "../../common/Header";

export default function Contact_Enquiry() {
  return (
    <div className="w-full">
      <div>
        <Header/>
        <div className="border-b-[3px] border-gray-300">
          <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
            Home / Enquiry / View
          </h2>
        </div>
        <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
          <h3 className="font-medium text-[25px]">
            Contact Enquiry Management
          </h3>
          <div className="flex gap-[10px]">
            <div className="bg-blue-600 p-[5px] rounded-[10px]">
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
        <table className="mx-[20px] bg-blue-950 py-[40px] text-white w-[96%] text-left border-collapse">
          {/* Define column widths once here */}
          <colgroup>
            <col className="w-[5%] " /> {/* Checkbox */}
            <col className="w-[30%] " /> {/* Name */}
            <col className="w-[20%] " /> {/* Email */}
            <col className="w-[20%] " /> {/* Mobile */}
            <col className="w-[15%] " /> {/* Status */}
            <col className="w-[10%] " /> {/* Action */}
          </colgroup>

          <thead className="font-bold">
            <tr>
              <th className="border border-white text-[15px] p-2">
                <input type="checkbox" className="ms-[14px]" />
              </th>
              <th className="border border-white text-[15px]">USER INFO</th>
              <th className="border border-white text-[15px]">SUBJECT</th>
              <th className="border border-white text-[15px]">MOBILE NUMBER</th>
              <th className="border border-white text-[15px]">STATUS</th>
              <th className="border border-white text-[15px]">ACTION</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-white p-4">
                <input type="checkbox" className="ms-[8px]" />
              </td>
              <td className="border border-white">Himanshu Kharbade</td>
              <td className="border border-white">himanshu@email.com</td>
              <td className="border border-white">9876543210</td>
              <td className="border border-white">
                <button className="bg-green-500 px-3 py-1 rounded-md font-medium">
                  Active
                </button>
              </td>
              <td className="border border-white">
                <div className="mx-[30px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center">
                  <MdOutlineEdit className="text-white text-[20px]" />
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-white p-4">
                <input type="checkbox" className="ms-[8px]" />
              </td>
              <td className="border border-white">John Doe</td>
              <td className="border border-white">john@email.com</td>
              <td className="border border-white">9123456789</td>
              <td className="border border-white">
                <button className="bg-red-500 px-3 py-1 rounded-md font-medium">
                  Deactive
                </button>
              </td>
              <td className="border border-white">
                <div className="mx-[30px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center">
                  <MdOutlineEdit className="text-white text-[20px]" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

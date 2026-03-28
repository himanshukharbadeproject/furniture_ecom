import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import Header from "../../common/Header";

export default function View_Color() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [colorList, setColorList] = useState([]);
  let [colorName, setColorName] = useState("");
  let [colorCode, setColorCode] = useState("");
  let [colorOrder, setColorOrder] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  let [limit, setLimit] = useState(0)

  let [ids, setIds] = useState([]);

  let getColors = () => {
    axios
      .get(`${apiBaseUrl}color/view`, {
        params: {
          colorName,
          colorCode,
          colorOrder,
          currentPage,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setColorList(finalRes.colorRes);
        setTotalPages(finalRes.totalPages);
        setLimit(finalRes.limit)
      });
  };

  let getAllCheckedBox = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value]);
    } else {
      setIds(ids.filter((v) => v != event.target.value));
    }
  };

  let multiDelete = () => {
    axios
      .post(`${apiBaseUrl}color/multidel`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        getColors();
        setIds([]);
      });
  };

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}color/change-status`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        getColors();
        setIds([]);
      });
  };

  // useEffect(() => {
  //   console.log(ids);
  // }, [ids]);

  useEffect(() => {
    getColors();
  }, [colorName, colorCode, colorOrder,currentPage]);

  return (
    <div className="border">
      <Header/>
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Color / View
        </h2>
      </div>

      <div className="flex mx-[20px] my-[30px] w-[940px]">
        <input
          placeholder="Enter Color Name"
          onChange={(event) => setColorName(event.target.value)}
          type="text"
          className="h-[40px] w-[300px] px-2.5 border"
        />

        <input
          placeholder="Enter Color Code"
          onChange={(event) => setColorCode(event.target.value)}
          type="text"
          className="h-[40px] w-[300px] px-2.5 border mx-[20px]"
        />

        <input
          placeholder="Enter Color Order"
          onChange={(event) => setColorOrder(event.target.value)}
          type="number"
          className="h-[40px] w-[300px] px-2.5 border"
        />

        <button onClick={getColors} className="bg-blue-600 h-10 w-[50px]">
          <FaSearch className="text-white mt-0.5 ms-3.5 text-[20px]" />
        </button>
      </div>

      <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">View Color</h3>
        <div className="flex gap-[10px]">
          <div className="bg-blue-600 p-[5px] rounded-[50%] cursor-pointer">
            <FaFilter className="text-white text-[19px] mt-[7px] mx-[10px]" />
          </div>
          <button
            onClick={changeStatus}
            className="text-white bg-green-600 text-[16px] rounded-[10px] p-[10px] font-medium px-[15px] cursor-pointer"
          >
            Change Status
          </button>
          <button
            onClick={multiDelete}
            className="text-white bg-red-600 p-[10px] rounded-[10px] px-[15px] font-medium cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
      <table className="mx-[20px] bg-blue-950 py-[40px] text-white w-[96%] text-left border-collapse">
        <colgroup>
          <col className="w-[5%]" />
          <col className="w-[10%]" />
          <col className="w-[30%]" />
          <col className="w-[15%]" />
          <col className="w-[15%]" />
          <col className="w-[15%]" />
          <col className="w-[10%]" />
        </colgroup>

        <thead className="font-bold">
          <tr>
            <th className="border border-white text-[15px] p-2">
              <input type="checkbox" className="ms-[14px]" />
            </th>
            <th className="border border-white text-[15px]">SR. NO.</th>
            <th className="border border-white text-[15px]">COLOR NAME</th>
            <th className="border border-white text-[15px]">CODE</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {colorList.length >= 1 ? (
            colorList.map((items, index) => {
              return (
                <tr key={items._id}>
                  <td className="border border-white p-4">
                    <input
                      value={items._id}
                      onChange={getAllCheckedBox}
                      checked={ids.includes(items._id)}
                      type="checkbox"
                      className="ms-[8px]"
                    />
                  </td>
                  <td className="border border-white">{((currentPage-1)*limit)+(index+1)}</td>
                  <td className="border border-white">{items.colorName}</td>
                  <td className="border border-white">{items.pickedColor}</td>
                  <td className="border border-white">{items.colorOrder}</td>
                  <td className="border border-white">
                    {items.colorStatus ? (
                      <button className="bg-green-500 px-3 py-1 rounded-md font-medium">
                        Active
                      </button>
                    ) : (
                      <button className="bg-red-500 px-3 py-1 rounded-md font-medium">
                        Deactive
                      </button>
                    )}
                  </td>
                  <td className="border border-white">
                    <Link to={`/edit_colors/${items._id}`}>
                      <div className="mx-[30px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center cursor-pointer">
                        <MdOutlineEdit className="text-white text-[20px]" />
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center h-[50px]">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="py-[50px]">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

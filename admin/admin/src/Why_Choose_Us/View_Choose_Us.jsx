import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Header from "../common/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import { Link } from "react-router";

export default function View_Choose_Us() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [chooseList, setChooseList] = useState([]);
  let [staticPath, setStaticPath] = useState("");
  let [ids, setIds] = useState([]);
  let [selectAll, setSelectAll] = useState(false);
  let [title, setTitle] = useState("");
  let [order, setOrder] = useState(null);
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getChooseUs();
  }, [ids, title, order, currentPage]);

  let getChooseUs = () => {
    axios
      .get(`${apiBaseUrl}choose/view`, {
        params: {
          title,
          order,
          currentPage
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setChooseList(finalRes.viewRes);
        setStaticPath(finalRes.staticPath);
        setTotalPages(finalRes.totalPages)
      });
  };

  // useEffect(() => {
  //   console.log(ids);
  // }, [ids]);

  let checkBoxes = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value]);
    } else {
      setIds(ids.filter((v) => v != event.target.value));
    }
  };

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}choose/change-status`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        getChooseUs();
      });
  };

  let deleteData = () => {
    axios
      .post(`${apiBaseUrl}choose/multi-delete`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        getChooseUs();
      });
  };

  let handleAll = (event) => {
    if (event.target.checked) {
      let arr = chooseList.map((item) => item._id);
      console.log(arr);
      setIds(arr);
    } else {
      setIds([]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (chooseList.length >= 1) {
      if (chooseList.length != ids.length) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
    }
  }, [ids]);

  return (
    <div className="border">
      <Header />
      <ToastContainer />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Why Choose Us / View
        </h2>
      </div>
      <div className="flex gap-[10px]">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="h-[40px] w-[250px] border mt-[30px] mx-[20px] text-[15px] px-[10px]"
          placeholder="Choose-Us Title"
        />
        <input
          onChange={(e) => setOrder(e.target.value)}
          type="number"
          className="h-[40px] w-[250px] border mt-[30px] mx-[20px] text-[15px] px-[10px]"
          placeholder="Choose-Us Order"
        />
      </div>
      <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[30px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">View Why Choose Us</h3>
        <div className="flex gap-[10px]">
          <div className="bg-blue-600 p-[5px] rounded-[50%]">
            <FaFilter className="text-white text-[19px] mt-[7px] mx-[10px]" />
          </div>
          <button
            onClick={changeStatus}
            className="text-white bg-green-600 text-[16px] rounded-[10px] p-[10px] font-medium px-[15px]"
          >
            Change Status
          </button>
          <button
            onClick={deleteData}
            className="text-white bg-red-600 p-[10px] rounded-[10px] px-[15px] font-medium "
          >
            Delete
          </button>
        </div>
      </div>
      <table className="mx-[20px] bg-blue-950 py-[40px] text-white w-[96.7%] text-left border-collapse">
        <colgroup>
          <col className="w-[5%] " />
          <col className="w-[20%] " />
          <col className="w-[30%] " />
          <col className="w-[15%] " />
          <col className="w-[20%] " />
          <col className="w-[10%] " />
        </colgroup>

        <thead className="font-bold">
          <tr>
            <th className="border border-white text-[15px] p-2">
              <input
                onChange={handleAll}
                checked={selectAll}
                type="checkbox"
                className="ms-[14px]"
              />
            </th>
            <th className="border border-white text-[15px]">TITLE</th>
            <th className="border border-white text-[15px]">IMAGE</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {chooseList.length >= 1 ? (
            chooseList.map((items, index) => {
              return (
                <tr key={index}>
                  <td className="border border-white p-4">
                    <input
                      value={items._id}
                      checked={ids.includes(items._id)}
                      onChange={checkBoxes}
                      type="checkbox"
                      className="ms-[8px]"
                    />
                  </td>
                  <td className="border border-white">{items.chooseTitle}</td>
                  <td className="border border-white">
                    <img
                      src={staticPath + items.chooseImage}
                      className="w-[20%] h-[40%]"
                    />
                  </td>
                  <td className="border border-white">{items.chooseOrder}</td>
                  <td className="border border-white">
                    <button
                      className={`px-3 py-1 rounded-md font-medium ${items.chooseStatus ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {items.chooseStatus ? "Active" : "Deactive"}
                    </button>
                  </td>
                  <td className="border border-white">
                    <Link to={`/edit_choose_us/${items._id}`}>
                      <div className="mx-[40px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center cursor-pointer">
                      <MdOutlineEdit className="text-white text-[20px]" />
                    </div>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-[50px]">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../common/Header";
import { Link } from "react-router";
import ResponsivePagination from "react-responsive-pagination";

export default function View_Category() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [selectAll, setSelectAll] = useState(false);
  let [categoryList, setCategoryList] = useState([]);
  let [categoryName, setCategoryName] = useState("");
  let [categoryOrder, setCategoryOrder] = useState("");
  let [ids, setIds] = useState([]);
  let [staticPath, setStaticPath] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(null);
  let [limit, setLimit] = useState(1);

  useEffect(() => {
    getCategory();
  }, [ids, categoryName, categoryOrder, currentPage]);

  let getCategory = () => {
    axios
      .get(`${apiBaseUrl}category/view`, {
        params: {
          categoryName,
          currentPage,
          categoryOrder,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setTotalPages(finalRes.totalPages);
        setCategoryList(finalRes.viewRes);
        setStaticPath(finalRes.StaticImagePath);
        setLimit(finalRes.limit);
      });
  };

  let checkedIds = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value]);
    } else {
      setIds(ids.filter((v) => v != event.target.value));
    }
  };

  let multiDelete = () => {
    // console.log("selected Ids: "+ids)
    axios
      .post(`${apiBaseUrl}category/multidel`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
        } else {
          toast.error(finalRes.msg);
        }
        getCategory();
        setIds([]);
      });
  };

  let toggleStatus = () => {
    axios
      .post(`${apiBaseUrl}category/change-status`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.status) {
          toast.success(finalRes.msg);
        } else {
          toast.error(finalRes.msg);
        }
        getCategory();
        setIds([]);
      });
  };

  let handleAll = (event) => {
    if (event.target.checked) {
      let allIds = categoryList.map((items) => items._id);
      console.log(allIds);
      setIds(allIds);
    } else {
      setIds([]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (categoryList.length >= 1) {
      if (categoryList.length != ids.length) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
    }
  }, [ids, categoryName, categoryOrder]);

  return (
    <div className="border">
      <ToastContainer />
      <Header />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Category / View
        </h2>
      </div>
      <div className="mt-[30px]">
        <input
          type="text"
          onChange={(e) => setCategoryName(e.target.value)}
          className="border h-[40px] ms-[25px] w-[250px] py-[15px] px-[10px] me-[10px]"
          placeholder="Category Name"
        />

        <input
          type="number"
          onChange={(e) => setCategoryOrder(e.target.value)}
          className="border h-[40px] ms-[25px] w-[250px] py-[15px] px-[10px]"
          placeholder="Category Order"
        />
      </div>
      <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[30px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">View Category</h3>
        <div className="flex gap-[10px]">
          <div className="bg-blue-600 p-[5px] rounded-[50%]">
            <FaFilter className="text-white text-[19px] mt-[7px] mx-[10px] cursor-pointer" />
          </div>
          <button
            onClick={toggleStatus}
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
      <table className="mx-[20px] bg-blue-950 py-[40px] text-white w-[96.7%] text-left border-collapse">
        <colgroup>
          <col className="w-[5%] " />
          <col className="w-[10%] " />
          <col className="w-[20%] " />
          <col className="w-[20%] " />
          <col className="w-[20%] " />
          <col className="w-[15%] " />
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
            <th className="border border-white text-[15px]">Sr. No.</th>
            <th className="border border-white text-[15px]">NAME</th>
            <th className="border border-white text-[15px]">IMAGE</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {categoryList.length >= 1 ? (
            categoryList.map((items, index) => {
              return (
                <tr key={index}>
                  <td className="border border-white p-4">
                    <input
                      onChange={checkedIds}
                      value={items._id}
                      checked={ids.includes(items._id)}
                      type="checkbox"
                      className="ms-[8px]"
                    />
                  </td>
                  <td className="border border-white">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="border border-white">{items.categoryName}</td>
                  <td className="border border-white">
                    <img
                      src={staticPath + items.categoryImage}
                      className="w-[50%] h-[20%]"
                    />
                  </td>
                  <td className="border border-white">{items.categoryOrder}</td>
                  <td className="border border-white">
                    <button
                      className={`px-3 py-1 rounded-md font-medium ${items.categoryStatus ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {items.categoryStatus ? "Active" : "Deactive"}
                    </button>
                  </td>
                  <td className="border border-white">
                    <Link to={`/edit_category/${items._id}`}>
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
              <td colSpan={6}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-[40px]">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

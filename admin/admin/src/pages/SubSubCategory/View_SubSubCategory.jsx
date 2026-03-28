import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Header from "../../common/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import { Link } from "react-router";

export default function View_SubSubCategory() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [subsubcategoryList, setSubSubCategoryList] = useState([]);
  let [parentCategoryMap, setParentCategoryMap] = useState({});
  let [subcategoryMap, setSubCategoryMap] = useState({});
  let [ids, setIds] = useState([]);
  let [staticPath, setStaticPath] = useState("");
  let [selectAll, setSelectAll] = useState(false);
  let [subsubcategoryName, setsubsubcategoryName] = useState("");
  let [subsubcategoryOrder, setsubcategoryOrder] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, settotalPages] = useState(1);

  let getData = () => {
    axios
      .get(`${apiBaseUrl}subsubcategory/view`, {
        params: {
          subsubcategoryName,
          subsubcategoryOrder,
          currentPage
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setSubSubCategoryList(finalRes.viewRes);
        setStaticPath(finalRes.staticPath);
        settotalPages(finalRes.totalPages)
      });
  };

  useEffect(() => {
    getData();
  }, [subsubcategoryName, subsubcategoryOrder, currentPage]);

  useEffect(() => {
    subsubcategoryList.forEach((item) => {
      fetchParentCategory(item.parentCategoryM);
      fetchSubCategory(item.subCategoryM);
    });
  }, [subsubcategoryList]);

  let fetchParentCategory = async (id) => {
    // avoid repeated API calls
    if (parentCategoryMap[id]) return;

    try {
      let res = await axios.get(
        `${apiBaseUrl}SubSubCategory/single-category/${id}`,
      );

      setParentCategoryMap((prev) => ({
        ...prev,
        [id]: res.data.category?.categoryName,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  let fetchSubCategory = async (id) => {
    if (subcategoryMap[id]) return;

    try {
      let res = await axios.get(
        `${apiBaseUrl}SubSubCategory/single-subCategory/${id}`,
      );

      setSubCategoryMap((prev) => ({
        ...prev,
        [id]: res.data.subcategory?.subcategoryName,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  let selectOne = (e) => {
    if (e.target.checked && !ids.includes(e.target.value)) {
      setIds([...ids, e.target.value]);
    } else {
      setIds(ids.filter((v) => v != e.target.value));
    }
  };

  // useEffect(() => {
  //   console.log(ids);
  // }, [ids]);

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}SubSubCategory/change-status`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        getData();
      });
    setIds([]);
  };

  let multiDelete = () => {
    axios
      .post(`${apiBaseUrl}SubSubCategory/multi-delete`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        getData();
      });
    setIds([]);
  };

  let handleAll = (e) => {
    if (e.target.checked) {
      let arr = subsubcategoryList.map((items) => items._id);
      setIds(arr);
    } else {
      setIds([]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (subsubcategoryList.length >= 1) {
      if (subsubcategoryList.length != ids.length) {
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
          Home / Sub Sub Category / View
        </h2>
      </div>
      <div className="ms-[20px] mt-[40px] flex gap-[20px]">
        <input
          onChange={(e) => setsubsubcategoryName(e.target.value)}
          type="text"
          placeholder="Sub Sub Category Name"
          className="border h-[40px] w-[250px] text-[15px] px-[10px]"
        />
        <input
          onChange={(e) => setsubcategoryOrder(e.target.value)}
          type="number"
          placeholder="Sub Sub Category Order"
          className="border h-[40px] w-[250px] text-[15px] px-[10px]"
        />
      </div>
      <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[30px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">View Sub Category</h3>
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
            onClick={multiDelete}
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
          <col className="w-[15%] " />
          <col className="w-[15%] " />
          <col className="w-[15%] " />
          <col className="w-[10%] " />
          <col className="w-[10%] " />
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
            <th className="border border-white text-[15px]">
              PARENT CATEGORY NAME
            </th>
            <th className="border border-white text-[15px]">
              SUB CATEGORY NAME
            </th>
            <th className="border border-white text-[15px]">
              SUB SUB CATEGORY NAME
            </th>
            <th className="border border-white text-[15px]">IMAGE</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {subsubcategoryList.length >= 1 ? (
            subsubcategoryList.map((items, index) => {
              return (
                <tr key={index}>
                  <td className="border border-white p-4">
                    <input
                      value={items._id}
                      onChange={selectOne}
                      checked={ids.includes(items._id)}
                      type="checkbox"
                      className="ms-[8px]"
                    />
                  </td>
                  <td className="border border-white">
                    {parentCategoryMap[items.parentCategoryM] || "Loading..."}
                  </td>
                  <td className="border border-white">
                    {subcategoryMap[items.subCategoryM] || "Loading..."}
                  </td>
                  <td className="border border-white">
                    {items.subSubCategoryName}
                  </td>
                  <td className="border border-white">
                    <img
                      src={staticPath + items.subSubCategoryImage}
                      className="w-[80%] h-[80%]"
                    />
                  </td>
                  <td className="border border-white">
                    {items.subSubCategoryOrder}
                  </td>
                  <td className="border border-white">
                    <button
                      className={`px-3 py-1 rounded-md font-medium ${items.subSubCategoryStatus ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {items.subSubCategoryStatus ? "Active" : "Deactive"}
                    </button>
                  </td>
                  <td className="border border-white">
                    <Link to={`/edit_subsubcategory/${items._id}`}>
                      <div className="mx-[40px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center">
                      <MdOutlineEdit className="text-white text-[20px]"/>
                    </div>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="text-center h-[50px]">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="my-[50px]">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
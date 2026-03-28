import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Header from "../../common/Header";
import axios from "axios";
import ResponsivePagination from "react-responsive-pagination";
import { Link } from "react-router";

export default function View_SubCategory() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [subcategoryList, setSubcategoryList] = useState([]);
  let [parentCategoryMap, setParentCategoryMap] = useState({});
  let [staticPath, setStaticPath] = useState("");
  let [ids, setIds] = useState([]);
  let [selectAll, setSelectAll] = useState(false);
  let [subcategoryName, setsubcategoryName] = useState("");
  let [subcategoryOrder, setsubcategoryOrder] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, settotalPages] = useState(1);
  let [limit, setlimit] = useState(1);

  let fetchParentCategory = async (id) => {
    // avoid repeated API calls
    if (parentCategoryMap[id]) return;

    try {
      let res = await axios.get(
        `${apiBaseUrl}subcategory/singleparentCategory/${id}`,
      );

      setParentCategoryMap((prev) => ({
        ...prev,
        [id]: res.data.category?.categoryName,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  let allCheckedIds = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value]);
    } else {
      setIds(ids.filter((v) => v != event.target.value));
    }
  };

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}subcategory/changeStatus`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        setIds([]);
        getSubCategory();
      });
  };

  let multidelete = () => {
    axios
      .post(`${apiBaseUrl}subcategory/multidel`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        setIds([]);
        getSubCategory();
      });
  };

  useEffect(() => {
    // console.log(ids);

    subcategoryList.forEach((item) => {
      fetchParentCategory(item.parentCategory);
    });
    // console.log(subcategoryList.length, ids.length);
    if (subcategoryList.length >= 1) {
      if (subcategoryList.length != ids.length) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
    }
  }, [ids, subcategoryList, subcategoryName, subcategoryOrder]);

  // useEffect(()=>{
  //   if(subcategoryList.length>=1){
  //     console.log(parentCategoryMap);
  //   }
  // },[ids])

  let getSubCategory = () => {
    axios
      .get(`${apiBaseUrl}subcategory/view`, {
        params: {
          subcategoryName,
          subcategoryOrder,
          currentPage,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.viewRes);
        setSubcategoryList(finalRes.viewRes);
        setStaticPath(finalRes.StaticImagePath);
        settotalPages(finalRes.totalPages);
        setlimit(finalRes.limit);
        console.log(parentCategoryMap);
      });
  };

  let handleAll = (event) => {
    if (event.target.checked) {
      let arr = subcategoryList.map((items) => items._id);
      setIds(arr);
    } else {
      setIds([]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    getSubCategory();
  }, [subcategoryName, subcategoryOrder, currentPage]);

  return (
    <div className="border">
      <Header />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Sub Category / View
        </h2>
      </div>
      <div className="flex gap-2.5">
        <input
          type="text"
          className="h-[40px] w-[250px] border ms-[20px] mt-[30px] px-[10px] py-[10px] text-[15px]"
          placeholder="Category Name"
        />
        <input
          onChange={(event) => setsubcategoryName(event.target.value)}
          type="text"
          className="h-[40px] w-[250px] border ms-[20px] mt-[30px] px-[10px] py-[10px] text-[15px]"
          placeholder="Sub-Category Name"
        />
        <input
          onChange={(event) => setsubcategoryOrder(event.target.value||null)}
          type="number"
          className="h-[40px] w-[250px] border ms-[20px] mt-[30px] px-[10px] py-[10px] text-[15px]"
          placeholder="Sub-Category Order"
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
            onClick={multidelete}
            className="text-white bg-red-600 p-[10px] rounded-[10px] px-[15px] font-medium "
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
          <col className="w-[15%] " />
          <col className="w-[15%] " />
          <col className="w-[15%] " />
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
            <th className="border border-white text-[15px]">Sr. No.</th>
            <th className="border border-white text-[15px]">
              PARENT CATEGORY NAME
            </th>
            <th className="border border-white text-[15px]">
              SUB CATEGORY NAME
            </th>
            <th className="border border-white text-[15px]">IMAGE</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {subcategoryList.length >= 1 ? (
            subcategoryList.map((items, index) => {
              return (
                <tr key={index}>
                  <td className="border border-white p-4">
                    <input
                      value={items._id}
                      onChange={allCheckedIds}
                      checked={ids.includes(items._id)}
                      type="checkbox"
                      className="ms-[8px]"
                    />
                  </td>
                  <td className="border border-white">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>

                  <td className="border border-white">
                    {parentCategoryMap[items.parentCategory] || "Loading..."}
                  </td>

                  <td className="border border-white">
                    {items.subcategoryName}
                  </td>
                  <td className="border border-white">
                    <img
                      src={staticPath + items.subcategoryImage}
                      className="w-[50%] h-[20%]"
                    />
                  </td>
                  <td className="border border-white">
                    {items.subcategoryOrder}
                  </td>
                  <td className="border border-white">
                    <button
                      className={`px-3 py-1 rounded-md font-medium ${items.subcategoryStatus ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {items.subcategoryStatus ? "Active" : "Deactive"}
                    </button>
                  </td>
                  <td className="border border-white">
                    <Link to={`/edit_subcategory/${items._id}`}>
                      <div className="mx-[40px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center">
                        <MdOutlineEdit className="text-white text-[20px]" />
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
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

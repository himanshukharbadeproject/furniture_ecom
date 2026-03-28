import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Header from "../../common/Header";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import { Link } from "react-router";

export default function View_Product() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [productList, setProductList] = useState([]);
  let [staticPath, setStaticPath] = useState("");
  let [viewProduct, setViewProduct] = useState(false);
  let [singleData, setSingleData] = useState(null);
  let [ids, setIds] = useState([]);
  let [selectAll, setSelectAll] = useState(false);
  let [productName, setProductName] = useState("");
  let [productOrder, setProductOrder] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [limit, setLimit] = useState(1);

  useEffect(() => {
    getProduct();
  }, [ids, productName, productOrder, currentPage]);

  // useEffect(() => {
  //   console.log(ids);
  // }, [ids]);

  let getProduct = () => {
    axios
      .get(`${apiBaseUrl}product/view`, {
        params: {
          productName,
          productOrder,
          currentPage,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.viewRes);
        setProductList(finalRes.viewRes);
        setStaticPath(finalRes.StaticImagePath);
        // console.log("Static Path: " + finalRes.StaticImagePath);
        setTotalPages(finalRes.totalPages);
        setLimit(finalRes.limit);
      });
  };

  let getSingleProduct = (id) => {
    axios
      .get(`${apiBaseUrl}product/single-view/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.singleView);
        setSingleData(finalRes.singleView);
      });
  };

  let handleOne = (e) => {
    if (e.target.checked && !ids.includes(e.target.value)) {
      setIds([...ids, e.target.value]);
    } else {
      setIds(ids.filter((v) => v != e.target.value));
    }
  };

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}product/change-status`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          getProduct();
        }
      });
    setIds([]);
  };

  let multiDelete = () => {
    axios
      .post(`${apiBaseUrl}product/multi-delete`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          getProduct();
        }
      });
    setIds([]);
  };

  let handleAll = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      let arr = productList.map((items) => items._id);
      setIds(arr);
    } else {
      setIds([]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (productList.length >= 1) {
      if (productList.length != ids.length) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
    }
  }, [ids]);

  return (
    <>
      {/* ================= SINGLE PRODUCT DETAIL VIEW ================= */}
      {viewProduct && singleData && (
        <div className="rounded-[10px] h-[420px] w-[80%] translate-x-[10%] translate-y-[40%] shadow-[0px_0px_10px_2px_gray]">
          <div className="flex justify-between m-[20px] border-b border-black pb-[10px]">
            <h3 className="text-[25px] text-red-500 font-bold">
              {singleData[0].productName}
            </h3>
            <button onClick={() => setViewProduct(false)}>
              <IoIosCloseCircleOutline className="text-[30px] cursor-pointer" />
            </button>
          </div>
          <div className="grid grid-cols-[60%_auto] ">
            <div className=" flex-cols overflow-y-scroll h-[300px]">
              <h3 className="text-center font-bold text-[18px]">Images</h3>
              <div className="flex justify-around gap-[20px] h-[230px] mt-[10px]">
                <div className="">
                  <img
                    src={staticPath + singleData[0].productImage}
                    className="h-[200px] w-[250px]"
                  />
                  <h4 className="text-[15px] font-semibold text-center">
                    Main Image
                  </h4>
                </div>
                <div>
                  <img
                    src={staticPath + singleData[0].productBackImage}
                    className="h-[200px] w-[250px]"
                  />
                  <h4 className="text-[15px] font-semibold text-center">
                    Back Image
                  </h4>
                </div>
              </div>
              <h3 className="text-center font-bold text-[18px]">Gallery</h3>
              <div className="flex flex-wrap gap-[20px] justify-center mt-[10px]">
                {singleData[0].productGallery.map((items, index) => {
                  if (index < 4) {
                    return (
                      <img
                      key={index}
                        src={staticPath + items}
                        className="h-[200px] w-[250px]"
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="border-l border-black overflow-y-scroll h-[300px]">
              <h3 className="text-center font-bold text-[18px] mb-[10px]">
                Product Details
              </h3>
              <p className="text-[15px] font-semibold ms-[40px] mb-[5px]">
                Parent Category :{" "}
                <span className="font-light">
                  {singleData[0].productParentCategory.categoryName}
                </span>
              </p>
              <p className="text-[15px] font-semibold ms-[40px] mb-[5px]">
                Sub Category :{" "}
                <span className="font-light">
                  {singleData[0].productSubCategory.subcategoryName}
                </span>
              </p>
              <p className="text-[15px] font-semibold ms-[40px] mb-[5px]">
                Sub Sub Category :{" "}
                <span className="font-light">
                  {singleData[0].productSubSubCategory.subSubCategoryName}
                </span>
              </p>

              <div className="flex items-center">
                <span className="font-semibold ms-[40px] mb-[5px] me-[10px] text-[15px]">
                  Colors:
                </span>
                <div className="flex gap-2">
                  {singleData[0].productColor.map((items, index) => {
                    const isWhite =
                      items.colorName.toLowerCase() === "white" ||
                      items.colorName === "#fff" ||
                      items.colorName === "#ffffff";

                    return (
                      <span
                        key={index}
                        className={`px-2 py-0.5 rounded-md text-sm ${
                          isWhite
                            ? "text-black border border-black"
                            : "text-white"
                        }`}
                        style={{ background: items.colorName }}
                      >
                        {items.colorName}
                      </span>
                    );
                  })}
                </div>
              </div>
              <p className="text-[15px] font-semibold ms-[40px] mb-[5px] mt-[5px]">
                Material :{" "}
                <span className="font-light">
                  {singleData[0].productMaterial.map((items, index) => {
                    return (
                      <span 
                      key={index}
                      className={`px-1 py-0.5 text-black rounded-md`}>
                        {items.materialName}
                      </span>
                    );
                  })}
                </span>
              </p>

              <p className="text-[15px] font-semibold ms-[40px] mb-[5px]">
                Actual Price :{" "}
                <span className="font-light">
                  {singleData[0].productActualPrice}
                </span>
              </p>
              <p className="text-[15px] font-semibold ms-[40px] mb-[5px]">
                Stock :{" "}
                <span className="font-light">{singleData[0].productStock}</span>
              </p>
              <p className="text-[15px] font-semibold ms-[40px] mb-[5px]">
                Description :{" "}
                <span className="font-light">{singleData[0].productDesc}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRODUCT LIST ================= */}
      {!viewProduct && (
        <div className="border">
          <Header />
          <ToastContainer />
          <div className="border-b-[3px] border-gray-300">
            <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
              Home / Product / Product Items
            </h2>
          </div>

          <div className="mt-[30px] flex mx-[20px] gap-5">
            <input
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              placeholder="Product Name"
              className="border h-[40px] w-[300px] px-[10px] text-[15px]"
            />
            <input
              onChange={(e) => setProductOrder(e.target.value)}
              type="number"
              placeholder="Product Order"
              className="border h-[40px] w-[300px] px-[10px] text-[15px]"
            />
          </div>

          <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
            <h3 className="font-medium text-[25px]">Product Items</h3>
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
              <col className="w-[3%] " />
              <col className="w-[5%] " />
              <col className="w-[17%] " />
              <col className="w-[10%] " />
              <col className="w-[25%] " />
              <col className="w-[10%] " />
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
                <th className="border border-white text-[15px]">Sr No.</th>
                <th className="border border-white text-[15px]">
                  Product Name
                </th>
                <th className="border border-white text-[15px]">Sales Price</th>
                <th className="border border-white text-[15px]">Image</th>
                <th className="border border-white text-[15px]">Order</th>
                <th className="border border-white text-[15px]">Status</th>
                <th className="border border-white text-[15px]">Action</th>
                <th className="border border-white text-[15px]">Detail</th>
              </tr>
            </thead>

            <tbody className="text-white">
              {productList.length >= 1 ? (
                productList.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-white p-4">
                        <input
                          value={items._id}
                          onChange={handleOne}
                          type="checkbox"
                          checked={ids.includes(items._id)}
                          className="ms-[8px]"
                        />
                      </td>
                      <td className="border border-white">
                        {index + 1 + (currentPage - 1) * limit}
                      </td>
                      <td className="border border-white">
                        {items.productName}
                      </td>
                      <td className="border border-white">
                        {items.productSalePrice}
                      </td>
                      <td className="border border-white">
                        <img
                          src={staticPath + items.productImage}
                          className="h-[80px] w-[80px]"
                        />
                      </td>
                      <td className="border border-white">
                        {items.productOrder}
                      </td>
                      <td className="border border-white mt-[10px]">
                        <button
                          className={`px-3 py-1 rounded-md font-medium ${items.productStatus ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {items.productStatus ? "Active" : "Deactive"}
                        </button>
                      </td>
                      <td className="border border-white">
                        <Link to={`/edit_product/${items._id}`}>
                          <div className="mx-[40px] py-[8px] bg-blue-800 rounded-[50%] flex items-center justify-center">
                          <MdOutlineEdit className="text-white text-[20px]" />
                        </div>
                        </Link>
                      </td>
                      <td className="border border-white  mt-[10px]">
                        <button
                          onClick={() => {
                            getSingleProduct(items._id);
                            setViewProduct(true);
                          }}
                          className={`px-3 py-1 ms-[20px] font-medium border-b border-white cursor-pointer`}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
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
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Header from "../../common/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import { Link } from "react-router";

export default function View_Testimonial() {
  let [testimonialList, setTestimonialList] = useState([]);
  let [staticPath, setStaticPath] = useState("");
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [ids, setIds] = useState([]);
  let [selectAll, setSelectAll] = useState(false);
  let [testimonialName, setTestimonialName] = useState("");
  let [testimonialRating, setTestimonialRating] = useState(null);
  let [testimonialOrder, setTestimonialOrder] = useState(null);
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(null)
  let [limit, setLimit] = useState(1) 

  let getTestimonial = () => {
    axios
      .get(`${apiBaseUrl}testimonial/view`, {
        params: {
          testimonialName,
          testimonialRating,
          testimonialOrder,
          currentPage
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setTestimonialList(finalRes.viewRes);
        setStaticPath(finalRes.staticPath);
        setTotalPages(finalRes.totalPages)
        setLimit(finalRes.limit)
      });
  };

  useEffect(() => {
    getTestimonial();
  }, [ids, testimonialName, testimonialRating, testimonialOrder, currentPage]);

  let checkedBoxes = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value]);
    } else {
      setIds(ids.filter((v) => v != event.target.value));
    }
  };

  let ChangeStatus = () => {
    axios
      .post(`${apiBaseUrl}testimonial/change-status`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        getTestimonial();
      });
    setIds([]);
  };

  let MultiDelete = () => {
    axios
      .post(`${apiBaseUrl}testimonial/multi-delete`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        getTestimonial();
      });
    setIds([]);
  };

  let handleAll = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      let arr = testimonialList.map((items) => items._id);
      setIds(arr);
    } else {
      setIds([]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (testimonialList.length >= 1) {
      if (testimonialList.length != ids.length) {
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
          Home / Testimonial / View
        </h2>
      </div>

      <div className="mt-[30px] gap-[20px] flex ms-[20px]">
        <input
          onChange={(e) => setTestimonialName(e.target.value)}
          type="text"
          placeholder="Testimonial Name"
          className="border h-[40px] w-[250px] px-[10px] text-[15px]"
        />
        <input
          onChange={(e) => setTestimonialRating(e.target.value)}
          type="number"
          placeholder="Testimonial Rating"
          className="border h-[40px] w-[250px] px-[10px] text-[15px]"
        />
        <input
          onChange={(e) => setTestimonialOrder(e.target.value)}
          type="number"
          placeholder="Testimonial Order"
          className="border h-[40px] w-[250px] px-[10px] text-[15px]"
        />
      </div>

      <div className="flex justify-between border mx-[20px] px-[20px] items-center mt-[30px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">View Testimonials</h3>
        <div className="flex gap-[10px]">
          <div className="bg-blue-600 p-[5px] rounded-[50%]">
            <FaFilter className="text-white text-[19px] mt-[7px] mx-[10px]" />
          </div>
          <button
            onClick={ChangeStatus}
            className="text-white bg-green-600 text-[16px] rounded-[10px] p-[10px] font-medium px-[15px]"
          >
            Change Status
          </button>
          <button
            onClick={MultiDelete}
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
          <col className="w-[10%] " />
          <col className="w-[15%] " />
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
            <th className="border border-white text-[15px]">SR. NO.</th>
            <th className="border border-white text-[15px]">NAME</th>
            <th className="border border-white text-[15px]">IMAGE</th>
            <th className="border border-white text-[15px]">DESIGNATION</th>
            <th className="border border-white text-[15px]">RATING</th>
            <th className="border border-white text-[15px]">ORDER</th>
            <th className="border border-white text-[15px]">STATUS</th>
            <th className="border border-white text-[15px]">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {testimonialList.length >= 1 ? (
            testimonialList.map((items, index) => {
              console.log(currentPage, limit)
              return (
                <tr key={index}>
                  <td className="border border-white p-4">
                    <input
                      value={items._id}
                      onChange={checkedBoxes}
                      checked={ids.includes(items._id)}
                      type="checkbox"
                      className="ms-[8px]"
                    />
                  </td>
                  <td className="border border-white">
                    {(index+1)+((currentPage-1)*limit)}
                  </td>
                  <td className="border border-white">
                    {items.testimonialName}
                  </td>
                  <td className="border border-white">
                    <img
                      src={staticPath + items.testimonialImage}
                      className="w-[80%] h-[80%]"
                    />
                  </td>
                  <td className="border border-white">
                    {items.testimonialDesignation}
                  </td>
                  <td className="border border-white">
                    {items.testimonialRating}
                  </td>
                  <td className="border border-white">
                    {items.testimonialOrder}
                  </td>
                  <td className="border border-white">
                    <button
                      className={`px-3 py-1 rounded-md font-medium ${items.testimonialStatus ? "bg-green-500 " : "bg-red-500 "}`}
                    >
                      {items.testimonialStatus ? "Active" : "Deactive"}
                    </button>
                  </td>
                  <td className="border border-white">
                    <Link to={`/edit_testimonial/${items._id}`}>
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
              <td>No Data Found</td>
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

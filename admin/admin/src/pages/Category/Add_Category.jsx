import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Header from "../../common/Header";

export default function Add_Category() {
  let [preview, setPreview] = useState(import.meta.env.VITE_PIMAGE);

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let navigate = useNavigate();

  let [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryOrder: "",
    categoryImage: "",
  });

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    console.log("ID: " + id);
    if (id) {
      axios
        .get(`${apiBaseUrl}category/single-data/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes.singleData.categoryImage);
          setCategoryData({
            categoryName: finalRes.singleData.categoryName,
            categoryOrder: finalRes.singleData.categoryOrder,
            categoryImage: finalRes.singleData.categoryImage,
          });
          setPreview(finalRes.path + finalRes.singleData.categoryImage);
        });
    }
  }, [id]);

  let saveCategory = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);
    let apiUrl = id
      ? `${apiBaseUrl}category/update-single/${id}`
      : `${apiBaseUrl}category/insert`;

    axios
      .post(apiUrl, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          setTimeout(() => navigate("/view_category"), 2000);
        } else {
          toast.error(finalRes.msg);
        }
      });
  };

  return (
    <div className="border">
      <ToastContainer />
      <Header />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Category / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Category</h3>
      </div>
      <form
        onSubmit={saveCategory}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div className="flex-col">
            <h3 className="text-[16px] font-medium mb-[5px]">Category Image</h3>
            <div className="h-[250px]">
              <img src={preview} className="h-[200px] border border-black" />
              <input
                name="categoryImage"
                className="cursor-pointer"
                type="file"
                // onChange={(e) => {
                //   setPreview(URL.createObjectURL(e.target.files[0]));
                // }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Category Name</h3>
            <input
              name="categoryName"
              defaultValue={categoryData.categoryName}
              type="text"
              placeholder="Material Name"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              name="categoryOrder"
              defaultValue={categoryData.categoryOrder}
              type="text"
              placeholder="Order"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
          </div>
        </div>
        <button className="bg-purple-700 py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px] cursor-pointer">
          {id ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
}

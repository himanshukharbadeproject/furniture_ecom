import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Header from "../../common/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export default function Add_Slider() {
  let [preview, setPreview] = useState(import.meta.env.VITE_PIMAGE);
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let navigate = useNavigate();
  let { id } = useParams();
  let [sliderData, setSliderData] = useState({
    sliderTitle: "",
    sliderOrder: "",
    sliderImage: "",
  });

  let submitSlider = (event) => {
    event.preventDefault();
    let formValue = new FormData(event.target);
    if (id) {
      axios
        .post(`${apiBaseUrl}slider/update/${id}`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          toast.success(finalRes.msg);
          setInterval(() => {
            navigate("/view_slider");
          }, [2000]);
        });
    } else {
      axios
        .post(`${apiBaseUrl}slider/insert`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          toast.success(finalRes.msg);
          setInterval(() => {
            navigate("/view_slider");
          }, [2000]);
        });
    }
    event.target.reset();
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}slider/view/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setSliderData({
            sliderTitle: finalRes.viewSingleRes[0].sliderTitle,
            sliderOrder: finalRes.viewSingleRes[0].sliderOrder,
          });
          setPreview(finalRes.path + finalRes.viewSingleRes[0].sliderImage);
        });
    }
  }, [id]);

  return (
    <div className="border">
      <Header />
      <ToastContainer />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Slider / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Slider</h3>
      </div>
      <form
        onSubmit={submitSlider}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div className="flex-col">
            <h3 className="mb-[10px] font-medium">Choose Image</h3>
            <div className="h-[250px]">
              <img src={preview} className="h-[95%] border" />
              <input
                type="file"
                name="sliderImage"
                onChange={(e) =>
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Title</h3>
            <input
              name="sliderTitle"
              defaultValue={sliderData.sliderTitle}
              type="text"
              placeholder="Title"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              name="sliderOrder"
              defaultValue={sliderData.sliderOrder}
              type="text"
              placeholder="Order"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
          </div>
        </div>
        <button className="bg-purple-700 py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px]">
          {id ? "Update Slider" : "Add Slider"}
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Header from "../../common/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export default function Add_Testimonial() {
  let [preview, setPreview] = useState(import.meta.env.VITE_PIMAGE);
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let navigate = useNavigate();
  let { id } = useParams();
  let [testimonialData, setTestimonialData] = useState({
    testimonialName: "",
    testimonialDesignation: "",
    testimonialRating: "",
    testimonialOrder: "",
    testimonialMessage: "",
    testimonialImage: "",
  });

  let submitTestimonial = (event) => {
    event.preventDefault();
    let formValue = new FormData(event.target);
    if(id){
      axios
      .post(`${apiBaseUrl}testimonial/update/${id}`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        setInterval(() => {
          navigate("/view_testimonial");
        }, [2000]);
      });
    }
    else{
      axios
      .post(`${apiBaseUrl}testimonial/insert`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        toast.success(finalRes.msg);
        setInterval(() => {
          navigate("/view_testimonial");
        }, [2000]);
      });
    }
    event.target.reset();
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}testimonial/view/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setTestimonialData({
            testimonialName: finalRes.viewRes.testimonialName,
            testimonialDesignation: finalRes.viewRes.testimonialDesignation,
            testimonialRating: finalRes.viewRes.testimonialRating,
            testimonialOrder: finalRes.viewRes.testimonialOrder,
            testimonialMessage: finalRes.viewRes.testimonialMessage
          });
          setPreview(finalRes.path + finalRes.viewRes.testimonialImage)
        });
    }
  }, [id]);

  return (
    <div className="border">
      <Header />
      <ToastContainer />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Testimonial / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Testimonial</h3>
      </div>
      <form
        onSubmit={submitTestimonial}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div className="flex-col">
            <h3 className="mb-[10px] font-medium">Choose Image</h3>
            <div className="h-[250px]">
              <img src={preview} className="h-[95%] border" />
              <input
                type="file"
                name="testimonialImage"
                onChange={(e) =>
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Name</h3>
            <input
              type="text"
              name="testimonialName"
              defaultValue={testimonialData.testimonialName}
              placeholder="Name"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Designation</h3>
            <input
              type="text"
              name="testimonialDesignation"
              defaultValue={testimonialData.testimonialDesignation}
              placeholder="Designation"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Rating</h3>
            <input
              type="text"
              name="testimonialRating"
              defaultValue={testimonialData.testimonialRating}
              placeholder="Rating"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              type="text"
              name="testimonialOrder"
              defaultValue={testimonialData.testimonialOrder}
              placeholder="Order"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Message</h3>
            <textarea
              type="text"
              name="testimonialMessage"
              defaultValue={testimonialData.testimonialMessage}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px] h-[100px]"
            />
          </div>
        </div>
        <button className="bg-purple-700 py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px] cursor-pointer">
          {id? "Update Testimonial": "Add Testimonial"}
        </button>
      </form>
    </div>
  );
}

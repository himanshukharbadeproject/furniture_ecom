import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SketchPicker } from "react-color";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Header from "../../common/Header";

export default function Add_Country() {
  let [countryName, setCountryName] = useState("");
  let [countryOrder, setCountryOrder] = useState("");

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    setCountryName("");
    setCountryOrder("");

    if (id) {
      axios
        .get(`${apiBaseUrl}country/view/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes.singleRes.countryName);
          setCountryName(finalRes.singleRes.countryName);
          setCountryOrder(finalRes.singleRes.countryOrder);
        });
    }
  }, [id]);

  let obj = {
    countryName,
    countryOrder: Number(countryOrder),
  };

  let CountrySave = (event) => {
    if(id){
      event.preventDefault();
      axios.put(`${apiBaseUrl}country/update/${id}`,obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          setInterval(() => {
            navigate("/view_country");
          }, 2000);
        } else {
          toast.error(finalRes.msg);
        }
        setCountryName("");
        setCountryOrder("");
      });
    }
    else{
      event.preventDefault();
    axios
      .post(`${apiBaseUrl}country/insert`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          setInterval(() => {
            navigate("/view_country");
          }, 2000);
        } else {
          toast.error(finalRes.msg);
        }
        setCountryName("");
        setCountryOrder("");
      });
    }
  };

  return (
    <div className="border">
      <ToastContainer />
      <Header/>
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Country / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Country</h3>
      </div>
      <form
        onSubmit={CountrySave}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <h3 className="mb-[5px]">Category Name</h3>
        <input
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          type="text"
          placeholder="Country Name"
          className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
        />
        <h3 className="mb-[5px]">Order</h3>
        <input
          value={countryOrder}
          onChange={(e) => setCountryOrder(e.target.value)}
          type="text"
          placeholder="Enter Order"
          className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
        />
        <button className="py-[7px] px-[20px] bg-purple-700 rounded-[5px] text-white font-medium my-[30px] cursor-pointer">
          {id? "Update Country" : "Add Country"}
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SketchPicker } from "react-color";
import ColorPicker from "../../common/Color_Picker";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Header from "../../common/Header";

export default function Add_Colors() {
  let [colorName, setColorName] = useState("");
  let [colorOrder, setColorOrder] = useState("");
  let [pickedColor, setPickedColor] = useState("");

  let navigate = useNavigate();

  let { id } = useParams();
  // console.log(id);

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let obj = {
    colorName,
    colorOrder: Number(colorOrder),
    pickedColor,
  };

  let ColorSave = (event) => {
    if (id) {
      event.preventDefault();
      axios.put(`${apiBaseUrl}color/update/${id}`,obj)
      .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status) {
            toast.success(finalRes.msg);
            setInterval(() => {
              navigate("/view_color");
            }, 2000);
          } else {
            toast.error(finalRes.msg);
          }
          setColorName("");
          setColorOrder("");
          setPickedColor("");
        });
    } else {
      event.preventDefault();
      axios
        .post(`${apiBaseUrl}color/insert`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status) {
            toast.success(finalRes.msg);
            setInterval(() => {
              navigate("/view_color");
            }, 2000);
          } else {
            toast.error(finalRes.msg);
          }
          setColorName("");
          setColorOrder("");
          setPickedColor("");
        });
    }
  };

  useEffect(() => {
    setColorName("");
    setColorOrder("");
    setPickedColor("");
    if (id) {
      axios
        .get(`${apiBaseUrl}color/view/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes.colorRes)
          setColorName(finalRes.colorRes.colorName);
          setColorOrder(finalRes.colorRes.colorOrder);
        });
    }
  },[id]);

  return (
    <div className="border">
      <ToastContainer />
      <Header/>
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / News Letter / View
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Colors</h3>
      </div>
      <form
        onSubmit={ColorSave}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <h3 className="mb-[5px]">Color Name</h3>
        <input
          value={colorName}
          onChange={(event) => setColorName(event.target.value)}
          type="text"
          placeholder="Enter Color Name"
          className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
        />
        <h3 className="mb-[5px]">Color Picker</h3>

        <ColorPicker
          onColorChange={(col) => {
            console.log("change color: " + col);
            setPickedColor(col);
          }}
          className="mb-[20px]"
        />

        {/* <ColorPicker className= "mb-[20px]"/> */}
        <h3 className="mb-[5px]">Order</h3>
        <input
          value={colorOrder}
          onChange={(event) => setColorOrder(event.target.value)}
          type="text"
          placeholder="Enter Order"
          className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
        />
        <button className="py-[7px] px-[20px] bg-purple-700 rounded-[5px] text-white font-medium my-[30px] cursor-pointer">
          {id ? "Update Color" : "Add Color"}
        </button>
      </form>
    </div>
  );
}

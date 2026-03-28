import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Header from "../common/Header";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";

export default function Add_Choose_Us() {

  let [preview, setPreview] = useState(import.meta.env.VITE_PIMAGE)
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let navigate = useNavigate()
  let {id} = useParams()
  let [formValue, setFormValue] = useState({
    chooseTitle: "",
    chooseOrder: "",
    chooseImage: "",
    chooseDesc: ""
  })

  let saveChoose = (event)=>{
    event.preventDefault()
    let formValue = new FormData(event.target)
    if(id){
      axios.post(`${apiBaseUrl}choose/update/${id}`,formValue).then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        toast.success(finalRes.msg)
        setInterval(()=>{
          navigate("/view_choose_us")
        },[2000])
      }
      event.target.reset()
    })
    }
    else{
    axios.post(`${apiBaseUrl}choose/insert`,formValue).then((res)=>res.data).then((finalRes)=>{
      if(finalRes.status){
        toast.success(finalRes.msg)
        setInterval(()=>{
          navigate("/view_choose_us")
        },[2000])
      }
      event.target.reset()
    })
    }
  }

  useEffect(()=>{
    if(id){
      axios.get(`${apiBaseUrl}choose/view-single/${id}`).then((res)=>res.data).then((finalRes)=>{
        setFormValue({
          chooseTitle: finalRes.singleData[0].chooseTitle,
          chooseOrder: finalRes.singleData[0].chooseOrder,
          chooseDesc: finalRes.singleData[0].chooseDesc
        })
        setPreview(finalRes.path + finalRes.singleData[0].chooseImage)
      })
    }
  },[id])

  return (
    <div className="border">
      <Header/>
      <ToastContainer />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Why Choose Us / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Why Choose Us</h3>
      </div>
      <form 
      onSubmit={saveChoose}
      className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]">
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div className="flex-col">
            <h3 className="mb-[10px] font-medium">Choose Image</h3>
            <div className="h-[250px]">
              <img src={preview}
               className="h-[200px] border" />
              <input 
              name="chooseImage"
              className="cursor-pointer"
              onChange={(event)=>{
                setPreview(URL.createObjectURL(event.target.files[0]))
              }}
              type="file" />
            </div>
          </div>
          <div>
            <h3 className="mb-[5px] font-medium">Title</h3>
            <input
              type="text"
              name="chooseTitle"
              defaultValue={formValue.chooseTitle}
              placeholder="Title"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              type="text"
              name="chooseOrder"
              defaultValue={formValue.chooseOrder}
              placeholder="Order"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Description</h3>
            <textarea
            name="chooseDesc"
            defaultValue={formValue.chooseDesc}
              placeholder="Write description here..."
              className="border w-[100%] rounded-[5px] px-[10px] py-[8px] mb-[20px] h-[100px] resize-none"
            ></textarea>
          </div>
        </div>
        <button className="bg-purple-700 py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px] cursor-pointer">
          {id? "Update Category": "Add Category"}
        </button>
      </form>
    </div>
  );
}
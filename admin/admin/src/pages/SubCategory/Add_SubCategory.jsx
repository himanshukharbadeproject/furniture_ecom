import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Header from "../../common/Header";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";

export default function Add_SubCategory() {

  let [preview, setPreview] = useState(import.meta.env.VITE_PIMAGE)
  let [parentCatList, setParentCatList] = useState([])
  let [formData, setFormData] = useState({
    parentCategory: "",
    subcategoryName: "",
    subcategoryOrder: ""
  })

  let navigate = useNavigate()
  let {id} = useParams()
  // console.log(id)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL

  useEffect(()=>{
    if(id){
      axios.get(`${apiBaseUrl}subcategory/single-subcategory/${id}`).then((res)=>res.data).then((finalRes)=>{
        // console.log(finalRes.singleRes[0])
        setFormData({
          parentCategory: finalRes.singleRes[0].parentCategory,
          subcategoryName: finalRes.singleRes[0].subcategoryName,
          subcategoryOrder: finalRes.singleRes[0].subcategoryOrder
        })
        setPreview(finalRes.StaticImagePath + finalRes.singleRes[0].subcategoryImage)
      })
    }
  },[id])

  let submitSubCategory=(event)=>{
    event.preventDefault()
    let formValue = new FormData(event.target)

    if(id){
      axios.post(`${apiBaseUrl}subcategory/update/${id}`,formValue).then((res)=>res.data).then((finalRes)=>{
      toast.success(finalRes.msg)
      setTimeout(()=>{
        navigate("/view_subcategory")
      },2000)
    })
    }
    else{
      axios.post(`${apiBaseUrl}subcategory/insert`,formValue).then((res)=>res.data).then((finalRes)=>{
      toast.success(finalRes.msg)
      setTimeout(()=>{
        navigate("/view_subcategory")
      },[2000])
    })
    }
    
    event.target.reset()
  }

  let getParentCategory = ()=>{
    axios.get(`${apiBaseUrl}subcategory/parentCategory`).then((res)=>res.data).then((finalRes)=>{
      setParentCatList(finalRes.category)
    })
  }

  useEffect(()=>{
    getParentCategory()
  },[])

  return (
    <div className="border">
      <ToastContainer />
      <Header/>
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Sub Category / Add
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Sub Category</h3>
      </div>
      <form 
      onSubmit={submitSubCategory}
      className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]">
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div className="flex-col">
            <h3 className="text-[16px] font-medium mb-[5px]">Category Image</h3>
            <div className="h-[250px]">
              <img src={preview} 
              className="h-[200px] border"/>
              <input
              name="subcategoryImage"
              type="file"
              onChange={(e)=>setPreview(URL.createObjectURL(e.target.files[0]))}
              />
            </div>
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Parent Category Name</h3>
            <select
              value={formData.parentCategory}
              name="parentCategory"
              onChange={(e)=>setFormData({...formData, parentCategory: e.target.value})}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            >
              <option value="">Select Category</option>
            {
              parentCatList.map((items)=>
                  <option
                  key={items._id}
                  value={items._id}>{items.categoryName}</option>
              )
            }
            </select>
            <h3 className="mb-[5px] font-medium">Sub Category Name</h3>
            <input
              type="text"
              value={formData.subcategoryName}
              onChange={(e)=>setFormData({
                ...formData, subcategoryName: e.target.value
              })}
              name="subcategoryName"
              placeholder="Sub-Category Name"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              type="number"
              value={formData.subcategoryOrder}
              name="subcategoryOrder"
              placeholder="Order"
              onChange={(e)=>setFormData({...formData, subcategoryOrder: e.target.value})}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
          </div>
        </div>
        <button className={`py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px] cursor-pointer ${id? "bg-black": "bg-purple-700"}`}>
          {id? "Update Sub Category": "Add Sub Category"}
        </button>
      </form>
    </div>
  );
}
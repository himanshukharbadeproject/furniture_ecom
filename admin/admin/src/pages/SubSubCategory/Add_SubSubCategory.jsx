import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import FileUploader from "../../common/Drop_Zone";
import Header from "../../common/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


export default function Add_SubSubCategory() {
  let [preview, setPreview] = useState(import.meta.env.VITE_PIMAGE);
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  let [parentCategoryList, setParentCategoryList] = useState([]);
  let [subCategoryList, setSubCategoryList] = useState([]);
  let navigate = useNavigate()
  let [formData, setFormData] = useState({
    parentCategoryM: "",
    subCategoryM: "", 
    subSubCategoryName: "",
    subSubCategoryOrder: ""
  })

  let {id} = useParams()
  console.log(id)

  useEffect(()=>{
    if(id){
      axios.get(`${apiBaseUrl}subsubcategory/single-subsubcategory/${id}`).then((res)=>res.data).then((finalRes)=>{
        console.log(finalRes.singleData[0])
        setFormData({
          parentCategoryM: finalRes.singleData[0].parentCategoryM,
          subCategoryM: finalRes.singleData[0].subCategoryM,
          subSubCategoryName: finalRes.singleData[0].subSubCategoryName,
          subSubCategoryOrder: finalRes.singleData[0].subSubCategoryOrder,
        })
        setPreview(finalRes.staticPath + finalRes.singleData[0].subSubCategoryImage)
      })
    }
  },[id])

  let getCategory = () => {
    axios
      .get(`${apiBaseUrl}subsubcategory/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.msg);
        setParentCategoryList(finalRes.data);
      });
  };

  useEffect(() => {
  if (formData.parentCategoryM) {
    getsubCategory(formData.parentCategoryM);
  }
}, [formData.parentCategoryM]);


  let getsubCategory = (id) => {
    axios
      .get(`${apiBaseUrl}subsubcategory/sub-category/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.msg);
        console.log(finalRes.data);
        setSubCategoryList(finalRes.data);
      });
  };

  let saveData = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target);
    if(id){
      axios
      .post(`${apiBaseUrl}subsubcategory/update/${id}`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          setInterval(() => {
            navigate("/view_subsubcategory")
          }, 2000);
        }
      });
    }
    else{
      axios
      .post(`${apiBaseUrl}subsubcategory/insert`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg);
          setInterval(() => {
            navigate("/view_subsubcategory")
          }, 2000);
        }
      });
    }
    e.target.reset();
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="border">
      <Header />
      <ToastContainer />
      <div className="border-b-[3px] border-gray-300">
        <h2 className="text-left ps-[20px] text-[18px] text-gray-600 font-semibold my-[10px]">
          Home / Sub Sub Category / Add Sub Sub Category
        </h2>
      </div>

      <div className="border mx-[20px] px-[20px] text-left mt-[40px] bg-blue-50 py-[10px] rounded-t-[10px]">
        <h3 className="font-medium text-[25px]">Add Sub Sub Category</h3>
      </div>
      <form
        onSubmit={saveData}
        className="border mx-[20px] px-[10px] ps-[30px] text-left  py-[10px]"
      >
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div className="flex-col">
            <h3 className="text-[16px] font-medium mb-[5px]">
              Sub-Sub-Category Image
            </h3>
            <div className="h-[250px]">
              <img src={preview} className="h-[95%] w-full border" />
              <input
                type="file"
                name="subSubCategoryImage"
                onChange={(e) =>
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="">
            <h3 className="mb-[5px] font-medium">Parent Category Name</h3>
            <select
              name="parentCategoryM"
              value={formData.parentCategoryM}
              onChange={(e) => setFormData({...formData, parentCategoryM: e.target.value})}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
              placeholder="Select Category"
            >
              <option value="">Select Category</option>
              {parentCategoryList.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.categoryName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Sub Category Name</h3>
            <select
              name="subCategoryM"
              value={formData.subCategoryM}
              onChange={(e)=>setFormData({...formData, subCategoryM: e.target.value})}
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            >
              <option value="">Select Category</option>
              {subCategoryList.map((items, index) => (
                <option key={index} value={items._id}>
                  {items.subcategoryName}
                </option>
              ))}
            </select>
            <h3 className="mb-[5px] font-medium">Sub-Sub-Category Name</h3>
            <input
              type="text"
              value={formData.subSubCategoryName}
              onChange={(e)=>setFormData({...formData, subSubCategoryName: e.target.value})}
              name="subSubCategoryName"
              placeholder="Sub-Sub-Category Name"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
            <h3 className="mb-[5px] font-medium">Order</h3>
            <input
              type="number"
              value={formData.subSubCategoryOrder}
              onChange={(e)=>setFormData({...formData, subSubCategoryOrder: e.target.value})}
              name="subSubCategoryOrder"
              placeholder="Order"
              className="border py-[5px] w-[100%] rounded-[5px] px-[10px] mb-[20px]"
            />
          </div>
        </div>
        <button className={`py-[7px] px-[20px] my-[20px] text-white font-medium rounded-[5px] cursor-pointer ${id? "bg-black": "bg-purple-700"}`}>
          {id? "Update Sub Sub Category": "Add Sub Sub Category"}
        </button>
      </form>
    </div>
  );
}

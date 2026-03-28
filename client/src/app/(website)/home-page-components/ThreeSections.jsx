"use client";
import { fetchCart } from "@/app/slice/cartSlice";
import { store } from "@/app/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function ThreeSections({
  threeSectionDataList,
  threeSectionStaticPath,
  productType,
  setProductType,
}) {
  const router = useRouter();
  let cart = useSelector((store)=>store.cart.cart)
  // console.log(cart)

  let handleViewAll = () => {
    router.push(`/all_products?type=${productType}`);
  };

  return (
    <div className="bg-white w-full">
      <ToastContainer />
      <div className="w-[1320px] mx-auto border-black border">
        <div className="flex justify-center">
          <button
            onClick={() => setProductType(1)}
            className={`px-[30px] py-2.5 text-black font-semibold cursor-pointer text-[20px] hover:text-yellow-800 ${productType === 1 ? "border-2 border-yellow-700 text-yellow-800" : "border border-black"}`}
          >
            Featured
          </button>
          <button
            onClick={() => setProductType(2)}
            className={`px-[30px] py-2.5 text-black font-semibold cursor-pointer text-[20px] hover:text-yellow-800 ${productType === 2 ? "border-2 border-yellow-700 text-yellow-800" : "border border-black"}`}
          >
            New Arrival
          </button>
          <button
            onClick={() => setProductType(3)}
            className={`px-[30px] py-2.5 text-black font-semibold cursor-pointer text-[20px] hover:text-yellow-800 ${productType === 3 ? "border-2 border-yellow-700 text-yellow-800" : "border border-black"}`}
          >
            On Sale
          </button>
        </div>
        <div className="flex justify-end mb-[25px] me-[10px]">
          <button
            onClick={handleViewAll}
            className="shadow-[0px_0px_5px_1px_gray] py-[5px] px-[15px] text-[16px] font-bold cursor-pointer text-black rounded-[5px]"
          >
            View All...
          </button>
        </div>
        <div className={`text-black pt-[20px] mt-[5px]`}>
          <div className="grid grid-cols-4 gap-[20px]">
            {threeSectionDataList.map((items, index) => {
              return (
                <ThreeSectionProductItems
                  items={items}
                  threeSectionStaticPath={threeSectionStaticPath}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreeSectionProductItems({ items, threeSectionStaticPath }) {
  let user = useSelector((store) => store.login.user);
  let token = useSelector((store)=>store.login.token);
  let dispatch = useDispatch()
  let route = useRouter()
  // let [selectedColor, setSelectedColor] = useState(items.productColor[0]._id);
  let [selectedColor, setSelectedColor] = useState(items.productColor[0]._id);
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  // console.log(apiBaseUrl)
  // console.log(user)
  // console.log(items);

  let addToCart = () => {
    if (user) {
      let obj = {
        pid: items._id,
        image: items.productImage,
        price: items.productActualPrice,
        qty: 1,
        title: items.productName,
        color: selectedColor
      }

      axios.post(`${apiBaseUrl}cart/add-to-cart`,obj,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        if(res.data.status){
          dispatch(fetchCart())
          toast.success(res.data.msg);
          setTimeout(() => route.push("/cart-page"), 2000);
        }
        else{
          alert(res.data.msg)
        }
      })

      console.log(obj)
    } else {
      alert("please Login");
    }
  };

  return (
    <div className="shadow-[0px_0px_10px_2px_gray] flex-col mx-2.5 mb-5 rounded-[5px]">
      <img
        src={threeSectionStaticPath + items.productImage}
        className="h-[280px] w-full"
      />

      <h3 className="my-2.5 text-center text-[14px]">
        {items.productSubSubCategory?.subSubCategoryName}
      </h3>

      <h3 className="mt-4 font-bold text-[17px] text-center">
        {items.productName}
      </h3>

      <div className="flex-1 mx-8 my-4 border-t-2 border-gray-200"></div>

      <h4 className="text-center text-[19px] font-bold text-amber-600">
        <span className="line-through text-[17px] font-normal text-black">
          Rs. {items.productSalePrice}
        </span>{" "}
        Rs. {items.productActualPrice}
      </h4>

      <div className="flex justify-center gap-3 mt-3 cursor-pointer">
  {items.productColor.map((color) => (
    <div
      key={color._id}
      onClick={() => setSelectedColor(color._id)}
      className={`h-[18px] w-[18px] rounded-full border-2 cursor-pointer 
      ${selectedColor === color._id ? "border-black scale-125" : "border-gray-300"}`}
      style={{ backgroundColor: color.pickedColor }}
    ></div>
  ))}
</div>

      <div className="flex justify-center mb-5 gap-5 mt-3.5">
        <div className="px-3.5 py-2 border border-black hover:bg-yellow-600 text-[20px]">
          <FaRegHeart />
        </div>
        <button onClick={addToCart} className="px-3.5 py-2 border border-black cursor-pointer">
          <h2 className="text-[12px]">Add To Cart</h2>
        </button>
      </div>

      {/* <div className="h-1"></div> */}
    </div>
  );
}

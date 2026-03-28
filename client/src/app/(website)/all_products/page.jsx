"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

export default function AllProducts() {
  let searchParams = useSearchParams();
  // console.log(searchParams)
  let type = Number(searchParams.get("type"));
  let [product, setProduct] = useState([]);
  let [staticImagePath, setStaticImagePath] = useState("");
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let router = useRouter()

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = () => {
    axios
      .get(`${apiBaseUrl}home/threeSections`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.sectionRes);
        setProduct(finalRes.sectionRes);
        console.log(finalRes.staticImagePath);
        setStaticImagePath(finalRes.staticImagePath);
      });
  };

  let goBack = ()=>{
    router.push('/')
  }

  return (
    <div className="w-full bg-white text-black">
      <div className="w-[1320px] mx-auto pt-[20px]">

        <button 
        onClick={goBack}
        className="flex gap-[5px] text-[18px] border border-black py-[5px] px-[15px] cursor-pointer"><IoArrowBackSharp className="mt-[3px] text-[20px]"/>{" back"}</button>

        <h3 className="text-[30px] text-center py-[20px] font-bold">
          {type === 1 && "Featured Products"}
          {type === 2 && "New Arrival Products"}
          {type === 3 && "OnSale Products"}
        </h3>

        <div
          className={`text-black pt-[20px] mt-[5px]`}
        >
          <div className="grid grid-cols-4 gap-[20px]">
            {product
              .filter((item) => item.productType === type)
              .map((items, index) => (
                <div key={index}>
                  <div className="shadow-[0px_0px_10px_2px_gray] flex-col mx-2.5 mb-5 rounded-[5px]">
                    <img
                      src={staticImagePath + items.productImage}
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

                    <div className="flex justify-center mb-5 gap-5 mt-3.5">
                      <div className="px-3.5 py-2 border border-black hover:bg-yellow-600 text-[20px]">
                        <FaRegHeart />
                      </div>
                      <div className="px-3.5 py-2 border border-black">
                        <h2 className="text-[12px]">Add To Cart</h2>
                      </div>
                    </div>

                    <div className="h-1"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

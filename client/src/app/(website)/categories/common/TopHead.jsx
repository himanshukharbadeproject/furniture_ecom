import React from 'react'
import { FaRegHeart } from "react-icons/fa";


export default function TopHead() {
  return (
    <div className=' h-[60px] w-full flex-col'>
      <div className='flex justify-end me-3 text-black '>
        <p className='py-4'>Sort By: <span className='border py-1.5 px-9 mx-3'>Sort By </span>Showing 1-1 of 1 results</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-black mt-5">
        <div className="">
          <div className="shadow-[0px_0px_10px_2px_gray] flex-col mx-2.5 mb-5 rounded-[5px]">
            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg" />
            <h3 className="my-2.5 text-center text-[14px]">
              Cabinets and Sideboards
            </h3>
            <h3 className="mt-4 font-bold text-[17px] text-center">
              Louise Cabinet
            </h3>
            <div className="flex-1 mx-8 my-4 border-t-2 border-gray-200"></div>
            <h4 className="text-center text-[19px] font-bold text-amber-600">
              <span className="line-through text-[17px] font-normal text-black">
                {" "}
                Rs. 28,000
              </span>{" "}
              Rs.23,000
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
        <div className="">
          <div className="shadow-[0px_0px_10px_2px_gray] flex-col mx-2.5 mb-5 rounded-[5px]">
            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg" />
            <h3 className="my-2.5 text-center text-[14px]">
              Cabinets and Sideboards
            </h3>
            <h3 className="mt-4 font-bold text-[17px] text-center">
              Louise Cabinet
            </h3>
            <div className="flex-1 mx-8 my-4 border-t-2 border-gray-200"></div>
            <h4 className="text-center text-[19px] font-bold text-amber-600">
              <span className="line-through text-[17px] font-normal text-black">
                {" "}
                Rs. 28,000
              </span>{" "}
              Rs.23,000
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
        <div className="">
          <div className="shadow-[0px_0px_10px_2px_gray] flex-col mx-2.5 mb-5 rounded-[5px]">
            <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg" />
            <h3 className="my-2.5 text-center text-[14px]">
              Cabinets and Sideboards
            </h3>
            <h3 className="mt-4 font-bold text-[17px] text-center">
              Louise Cabinet
            </h3>
            <div className="flex-1 mx-8 my-4 border-t-2 border-gray-200"></div>
            <h4 className="text-center text-[19px] font-bold text-amber-600">
              <span className="line-through text-[17px] font-normal text-black">
                {" "}
                Rs. 28,000
              </span>{" "}
              Rs.23,000
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
      </div>
    </div>
  )
}

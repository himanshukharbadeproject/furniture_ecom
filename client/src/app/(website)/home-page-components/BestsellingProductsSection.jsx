"use client";
import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

export default function BestsellingProductsSection({
  bestSellingList,
  bestSellingImagePath,
}) {
  // create reference for slider
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false, // hide default arrows
  };

  // useEffect(() => {}, [threeSectionDataList]);

  // functions to control the slider
  const next = () => sliderRef.current.slickNext();
  const previous = () => sliderRef.current.slickPrev();

  return (
    <div className="bg-white w-full p-10">
      <div className="w-[1320px] mx-auto flex-col">
        {/* Header and arrows */}
        <div className="flex items-center justify-between text-black text-2xl mb-5">
          <span className="font-semibold">Bestselling Products</span>
          <div className="flex-1 mx-4 border-t-2 border-gray-200"></div>

          {/* custom navigation buttons */}
          <span className="flex text-[16px] font-bold">
            <button
              onClick={previous}
              className=" py-1 rounded hover:text-amber-400 transition"
            >
              <FaLessThan />
            </button>
            <button
              onClick={next}
              className="px-1 py-1 rounded hover:text-amber-400 transition"
            >
              <FaGreaterThan />
            </button>
          </span>
        </div>

        {/* Slider */}
        <Slider
          ref={sliderRef}
          {...settings}
          id="homeSlider"
          className="text-black"
        >
          {bestSellingList
            .map((items, index) => {
              return (
                <div className="">
                  <div className="shadow-[0px_0px_10px_2px_gray] flex-col mx-2.5 mb-5 rounded-[5px]">
                    <img 
                    src={bestSellingImagePath + items.productImage} 
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
                        {" "}
                        Rs. {items.productSalePrice}
                      </span>{" "}
                      {items.productActualPrice}
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
              );
            })}
        </Slider>
      </div>
    </div>
  );
}
"use client";
import React from "react";
import SideBar from "./common/SideBar.jsx";
import TopHead from "./common/TopHead.jsx";
import { PiGreaterThan } from "react-icons/pi";

export default function Categories() {
  return (
    <div className="bg-white w-full">
      <div className="w-[1320px] mx-auto">
        <div className="py-8">
          <h2 className="text-center text-4xl text-black font-bold">Product Listing</h2>
        <h4 className="flex items-center justify-center text-red-800 mt-2.5">Home <span className="text-[12px] mx-3"><PiGreaterThan /></span> Product Listing</h4>
        </div>
        <div className="grid grid-cols-[24%_auto] gap-9">
          <SideBar />
          <TopHead />
        </div>
      </div>
    </div>
  );
}

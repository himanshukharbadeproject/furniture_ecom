import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex-col">
      <div className="w-full bg-white">
        <div className="w-[1320px] mx-auto py-[50px]">
          <div className="grid grid-cols-[35%_15%_15%_auto]">
            <div className=" text-gray-600">
              <h3 className="text-[20px] text-gray-800 mb-5 font-bold">
                Contact Us
              </h3>
              <h4 className="text-[14px] mb-[9px]">
                Address: Claritas est etiam processus dynamicus
              </h4>
              <h4 className="text-[14px] mb-[9px]">
                Phone:{" "}
                <span className="text-gray-600 hover:text-amber-800 cursor-pointer">
                  98745612330
                </span>
              </h4>
              <h4 className="text-[14px] mb-[17px]">
                Email: furnitureinfo@gmail.com
              </h4>
              <div className="flex gap-3 cursor-pointer">
                <div className="h-[35px] w-[35px] rounded-[50%] border border-gray-400 flex items-center justify-center group hover:border-amber-400">
                  <FaFacebookF className="text-gray-400 group-hover:text-amber-400" />
                </div>
                <div className="h-[35px] w-[35px] rounded-[50%] border border-gray-400 flex items-center justify-center group hover:border-amber-400">
                  <IoLogoInstagram className="text-gray-400 group-hover:text-amber-400" />
                </div>
                <div className="h-[35px] w-[35px] rounded-[50%] border border-gray-400 flex items-center justify-center group hover:border-amber-400">
                  <FaXTwitter className="text-gray-400 group-hover:text-amber-400" />
                </div>
                <div className="h-[35px] w-[35px] rounded-[50%] border border-gray-400 flex items-center justify-center group hover:border-amber-400">
                  <FaLinkedinIn className="text-gray-400 group-hover:text-amber-400" />
                </div>
                <div className="h-[35px] w-[35px] rounded-[50%] border border-gray-400 flex items-center justify-center group hover:border-amber-400">
                  <FaYoutube className="text-gray-400 group-hover:text-amber-400" />
                </div>
                <div className="h-[35px] w-[35px] rounded-[50%] border border-gray-400 flex items-center justify-center group hover:border-amber-400">
                  <FaTelegramPlane className="text-gray-400 group-hover:text-amber-400" />
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="text-[20px] text-gray-800 mb-5 font-bold">
                Information
              </h3>
              <ul className="text-gray-600 text-[14px] cursor-pointer">
                <li className="mb-[8px] hover:text-amber-800">About Us</li>
                <li className="mb-[8px] hover:text-amber-800">Contact Us</li>
                <li className="hover:text-amber-800">Frequently Questions</li>
              </ul>
            </div>
            <div className="">
              <h3 className="text-[20px] text-gray-800 mb-5 font-bold">
                My Account
              </h3>
              <ul className="text-gray-600 text-[14px] cursor-pointer">
                <li className="mb-[8px] hover:text-amber-800">My Dashboard</li>
                <li className="mb-[8px] hover:text-amber-800">Wishlist</li>
                <Link href={"/cart-page"}><li className="mb-[8px] hover:text-amber-800">Cart</li></Link>
                <Link href={"/checkout-page"}><li className="hover:text-amber-800">Checkout</li></Link>
              </ul>
            </div>
            <div className="">
              <h3 className="text-[20px] text-gray-800 mb-5 font-bold">
                Top Rated Products
              </h3>
              <div className="flex-col">
                <div className="border-b border-gray-200 flex gap-5">
                  <img
                    src="https://images.jdmagicbox.com/quickquotes/images_main/coffee-table-set-of-2-chairs-2224179335-6t9xzua0.jpg"
                    className="h-[70px] w-[100px] cursor-pointer"
                  />
                  <div className="text-gray-600">
                    <h4 className="text-[14px] mt-1 cursor-pointer hover:text-amber-800">
                      Coffee Tables
                    </h4>
                    <h4 className="text-[17px] mt-0.5 cursor-pointer hover:text-amber-800">
                      Evan Coffee Table
                    </h4>
                    <div className="flex gap-2.5 mt-2.5 mb-3 text-[15px]">
                      <h5 className="line-through">Rs.2,600</h5>
                      <h5 className="text-amber-700 font-semibold">Rs.2,300</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-5">
                  <img
                    src="https://dreamlineoutdoorfurniture.com/cdn/shop/products/ezgif-4-d0d750c5092f.jpg?v=1734771399&width=1080"
                    className="h-[70px] w-[100px] cursor-pointer"
                  />
                  <div className="text-gray-600">
                    <h4 className="text-[14px] mt-1 cursor-pointer hover:text-amber-800">
                      Cabinets and Sideboard
                    </h4>
                    <h4 className="text-[17px] mt-0.5 cursor-pointer hover:text-amber-800">
                      Louise Cabinet
                    </h4>
                    <div className="flex gap-2.5 mt-2.5 mb-3 text-[15px]">
                      <h5 className="line-through">Rs.28,000</h5>
                      <h5 className="text-amber-700 font-semibold">Rs.23,000</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white border border-gray-200">
        <div className="w-[1320px] mx-auto py-[10px]">
          <div className="py-2.5">
            <ul className="flex justify-center items-center text-gray-800 gap-8">
              <li className="hover:text-amber-900 cursor-pointer">Home</li>
              <li className="hover:text-amber-900 cursor-pointer">Online Store</li>
              <li className="hover:text-amber-900 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-amber-900 cursor-pointer">Terms Of Use</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-white border pb-[40px]">
        <div className="w-[1320px] mx-auto py-[10px]">
          <h5 className="text-center text-gray-700 text-[14px] mt-[30px]">All Rights Reserved By Furniture | © 2025</h5>
          <div className="flex justify-center mt-[20px]">
          <img src="https://assets.justinmind.com/wp-content/uploads/2019/09/website-footer-examples-callista.png"/>
          </div>
        </div>
      </div>
    </div>
  );
}

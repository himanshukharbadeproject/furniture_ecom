"use client";

import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/app/slice/userSlice";
import { fetchCart } from "@/app/slice/cartSlice";

export default function Header() {
  let user = useSelector((store) => store.login.user);
  let cart = useSelector((store) => store.cart.cart);
  // console.log(cart)
  let dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="bg-white border border-black">
        <div className="mx-auto w-[1320px]">
          <div className="py-[11px] flex justify-between">
            <p className="text-[13px] text-black">
              Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com
            </p>
            {mounted &&
              (user ? (
                <button
                  className="text-[14px] text-yellow-600 cursor-pointer"
                  onClick={() => dispatch(logOut())}
                >
                  LogOut
                </button>
              ) : (
                <Link href="/reglog">
                  <h5 className="text-[13px] text-black hover:text-amber-800 cursor-pointer">
                    Login/Register
                  </h5>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-white border border-black">
        <div className="mx-auto w-[1320px] py-7">
          <div className="flex justify-between items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/28/Monsta-logo-white-stroke.png"
              className="h-[40px] cursor-pointer"
            />
            <div className="flex gap-5">
              <div className="border border-black h-10 w-[280px] flex justify-center items-center px-2.5">
                <input
                  type="search"
                  placeholder="Search product...."
                  className="w-[250px] text-black my-2.5 text-[13px] p-0.5"
                />
                <IoIosSearch className="text-black text-[20px] hover:text-amber-600 cursor-pointer" />
              </div>
              <div className="border border-black px-3 flex items-center h-10 group cursor-pointer">
                <FaHeart className="text-black text-[20px] group-hover:text-amber-600" />
              </div>
              <div className="border flex items-center p-3 gap-2.5 h-10 border-black group cursor-pointer">
                <div className="border-r border-black pr-2.5">
                  <FaShoppingCart className="text-black group-hover:text-amber-600" />
                </div>
                <h3 className="font-bold text-black text-[14px] group-hover:text-amber-600">
                  Rs. 30,000
                </h3>
                <RiArrowDropDownLine className="text-black text-[20px] group-hover:text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-black">
        <div className="mx-auto w-[1320px] py-4">
          <ul className="text-black flex gap-10 justify-center py-1.5 text-[13px]">
            <Link href={"/"}>
              <li className="hover:text-amber-800 cursor-pointer font-semibold">
                HOME
              </li>
            </Link>
            <li className="hover:text-amber-800 flex items-center relative">
              <h3 className="flex font-semibold cursor-pointer">
                LIVING <RiArrowDropDownLine className="text-[18px]" />
              </h3>
              <div className="absolute hidden top-[200%] left-0 h-80 w-[550px] bg-white z-10 pt-5 border">
                <div className="grid grid-cols-3">
                  <div className="">
                    <ul className="tracking-[0.4px]">
                      <li className="font-bold text-[13px] text-black mb-5 cursor-pointer">
                        TABLES
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Side And End Tables
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Nest Of Tables
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Coffee Tables Sets
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Coffee Tables
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <ul className="text-black tracking-[0.4px]">
                      <li className="font-bold text-[13px] mb-5 cursor-pointer">
                        MIRROR
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Wooden Mirrors
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <ul className="text-black tracking-[0.4px]">
                      <li className="font-bold text-[13px] mb-5 cursor-pointer">
                        LIVING STORAGE/COLLECTION
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Prayer Units
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Display Unit
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Shoe Racks
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Chest Of Drawers
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Cabinets And Sideboard
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Bookshelves
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        TV Units
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="hover:text-amber-800 flex items-center relative">
              <h3 className="flex font-semibold cursor-pointer">
                SOFA <RiArrowDropDownLine className="text-[18px]" />
              </h3>
              <div className="absolute hidden top-[200%] left-0 h-[260px] w-[550px] bg-white z-10 pt-5 border">
                <div className="grid grid-cols-3">
                  <div className="">
                    <ul className="tracking-[0.4px]">
                      <li className="font-bold text-[13px] text-black mb-5 cursor-pointer uppercase">
                        Sofa Cum Bed
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Wooden Sofa Cum Bed
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <ul className="text-black tracking-[0.4px]">
                      <li className="font-bold text-[13px] mb-5 cursor-pointer uppercase">
                        Sofa Sets
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        L Shape Sofa
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        1 Seater Sofa
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        2 Seater Sofa
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        3 Seater Sofa
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Wooden Sofa Sets
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Normal
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <ul className="text-black tracking-[0.4px]">
                      <li className="font-bold text-[13px] mb-5 cursor-pointer capitalize">
                        Swing Jhula
                      </li>
                      <li className="text-gray-700 text-[13px] mb-2 cursor-pointer hover:text-amber-800">
                        Wooden Jhula
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex items-center relative">
              <h3 className="flex font-semibold cursor-pointer hover:text-amber-800">
                PAGES <RiArrowDropDownLine className="text-[18px]" />
              </h3>
              <div className="absolute hidden top-[200%] left-0 bg-white z-10 pt-5 border ps-5 h-[150px] w-[190px]">
                <ul className="tracking-[0.4px]">
                  <li className="cursor-pointer text-[13px] mb-2.5">
                    About Us
                  </li>
                  <li className="cursor-pointer text-[13px] mb-2.5">Cart</li>
                  <li className="cursor-pointer text-[13px] mb-2.5">
                    Checkout
                  </li>
                  <li className="cursor-pointer text-[13px] mb-2.5">
                    Frequently Question
                  </li>
                </ul>
              </div>
            </li>
            <li className="hover:text-amber-800 cursor-pointer font-semibold">
              CONTACT US
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

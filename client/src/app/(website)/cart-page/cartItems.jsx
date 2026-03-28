"use client";

import { fetchCart } from "@/app/slice/cartSlice";
import axios from "axios";
// import { headers } from "next/headers";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function CartItems({ cart, imagePath }) {
  return (
    <>
      <table className="mx-auto bg-gray-300 py-[40px] text-black w-[80%] text-center border-collapse">
        <colgroup>
          <col className="w-[15%] " />
          <col className="w-[20%] " />
          <col className="w-[25%] " />
          <col className="w-[20%] " />
          <col className="w-[25%] " />
        </colgroup>

        <thead className="font-bold">
          <tr>
            <th className="border border-black text-[15px] p-2">DELETE</th>
            <th className="border border-black text-[15px]">NAME</th>
            <th className="border border-black text-[15px]">IMAGE</th>
            <th className="border border-black text-[15px]">COLOR VARIANT</th>
            <th className="border border-black text-[15px]">PRICE</th>
            <th className="border border-black text-[15px]">QUANTITY</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((items, index) => {
            return (
              <CartPerItems key={index} items={items} imagePath={imagePath} />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

let CartPerItems = ({ items, imagePath }) => {
  let { _id } = items;
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
  // console.log(apiBaseUrl)
  let dispatch = useDispatch();
  let [qty, setQty] = useState(items.qty);
  // let token = useSelector((store)=>store.cart.token)
  // console.log("CartPerItem: "+items)

  const increaseQty = async () => {
    // patch--> axios.patch is used when you want to partially update data on the server.
    // PUT--> Replace full data
    await axios.patch(`${apiBaseUrl}cart/update-qty/${_id}`, {
      action: "inc"},
    );
    setQty(qty + 1);
    dispatch(fetchCart());
  };

  const decreaseQty = async () => {
    if (qty > 1) {
      await axios.patch(`${apiBaseUrl}cart/update-qty/${_id}`, {
        action: "dec",
      });
      setQty(qty - 1);
      dispatch(fetchCart());
    }
  };

  let deleteCartItem = () => {
    if (confirm("Are you sure want to delete?")) {
      axios.delete(`${apiBaseUrl}cart/delete-cart/${_id}`).then((res) => {
        dispatch(fetchCart());
      });
    }
  };

  return (
    <tr>
      <td className="border border-black p-4 bg-white">
        <button onClick={deleteCartItem}>
          <MdDelete className="text-black text-[20px] cursor-pointer" />
        </button>
      </td>

      <td className="border border-black bg-white">{items.title}</td>

      <td className="border border-black bg-white">
        <img src={imagePath + items.image} className="w-[30%] h-[10%]" />
      </td>

      <td className="border border-black bg-white">
        <div className="flex items-center justify-center gap-2">
          <span
            className="w-[18px] h-[18px] rounded-full border"
            style={{ backgroundColor: items.color.pickedColor }}
          ></span>

          <span>{items.color.colorName}</span>
        </div>
      </td>

      <td className="border border-black bg-white">{items.price}</td>

      {/* Quantity Column */}
      <td className="bg-white border border-black ">
        <div className="flex items-center justify-center gap-2 border border-black">
          <button
            onClick={decreaseQty}
            className="bg-gray-200 px-3 py-1 text-lg font-bold cursor-pointer border-e border-black"
          >
            -
          </button>

          <span className="w-[30px] text-center font-semibold">{qty}</span>

          <button
            onClick={increaseQty}
            className="bg-gray-200 px-3 py-1 text-lg font-bold cursor-pointer border-s border-black"
          >
            +
          </button>
        </div>
      </td>
    </tr>
  );
};

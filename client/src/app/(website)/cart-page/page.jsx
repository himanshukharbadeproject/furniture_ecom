"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItems from "./cartItems";

export default function CartPage() {
  const login = useSelector((store) => store.login.user);
  const cart = useSelector((store) => store.cart.cart);
  const imagePath = useSelector((store) => store.cart.imagePath);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white w-full">
      <div className="mx-auto w-[1320px]">
        <div className="text-black mx-auto mb-[20px] border-b border-gray-300 pb-[20px]">
          <h1 className="text-[35px] font-bold text-center pt-[20px]">
            Shopping Cart
          </h1>
          <h3 className="text-[16px] font-medium text-center">
            Home -- Shopping Cart
          </h3>
        </div>

        {login ? (
          cart.length > 0 ? (
            <CartItems cart={cart} imagePath={imagePath} />
          ) : (
            <div className="flex items-center justify-center">
              <img
                src="https://banghieualu.com.vn/wp-content/uploads/2024/02/empty-cart.webp"
                className="h-[450px] w-[450px]"
              />
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH4axWBB5-Gw_ZkgjblrMAthQbBmuHQz95Xg&s"
              className="h-[450px] w-[450px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

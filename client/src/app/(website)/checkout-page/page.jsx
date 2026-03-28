"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { fetchCart } from "@/app/slice/cartSlice";

export default function CheckOutPage() {

  let dispatch= useDispatch()

  const { Razorpay } = useRazorpay();
  let cart = useSelector((store) => store.cart.cart);
  let [countryList, setCountryList] = useState([]);
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
  let token = useSelector((store) => store.login.token);
  let [PaymentMethod, setPaymentMethod] = useState(1);
  let orderAmount = cart.reduce((total, obj) => total + obj.price * obj.qty, 0);
  let orderQty = cart.reduce((total, obj) => total + obj.qty, 0);
  let [formData, setFormData] = useState({
    name: "",
    number: "",
    billingname: "",
    billingemail: "",
    billingnumber: "",
    billingaddress: "",
    country: "",
    state: "",
    city: "",
    ordernotes: "",
  });

  let orderPlaced = (event) => {
    event.preventDefault();
    console.log(PaymentMethod);

    let orderItems = cart.map((items) => {
      return {
        title: items.title,
        price: items.price,
        qty: items.qty,
        colorName: items.color.colorName,
        image: items.image,
      };
    });

    let shippingAddress = {
      name: formData.name,
      number: formData.number,
      billingname: formData.billingname,
      billingemail: formData.billingemail,
      billingnumber: formData.billingnumber,
      billingaddress: formData.billingaddress,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      ordernotes: formData.ordernotes,
    };

    // console.log(shippingAddress);

    let obj = {
      orderItems,
      shippingAddress,
      PaymentMethod,
      orderAmount,
      orderQty,
    };

    axios
      .post(`${apiBaseUrl}order/order-save`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.PaymentMethod == "2") {
          //Thank You Page
          dispatch(fetchCart())
        } else {
          let RazorpayOrderOptions = {
            key: "rzp_test_SUUxsHT7JSFJu7",
            amount: finalRes.orderRes.amount, // Amount in paise
            currency: "INR",
            name: "Tesla Company",
            description: "Test Transaction",
            order_id: finalRes.orderRes.id, // Generate order_id on server
            handler: (response) => {
              console.log(response)
              axios
                .post(`${apiBaseUrl}order/verify-order`, response, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => res.data).then((finalRes)=>{
                  dispatch(fetchCart())
                  console.log(finalRes)
                  //Thank You Page
                })

              alert("Payment Successful!");
            },
            prefill: {
              name: "John Doe",
              email: "john.doe@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#F37254",
            },
          };

          let razorpayInstance = new Razorpay(RazorpayOrderOptions);
          razorpayInstance.open();

          console.log(finalRes.orderRes);
        }
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  let getCountries = () => {
    axios
      .get(`${apiBaseUrl}cart/country`)
      .then((res) => res.data)
      .then((finalRes) => {
        setCountryList(finalRes.country);
      });
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto w-[1320px]">
        <div className="text-black mx-auto mb-[20px] border-b border-gray-300 pb-[20px]">
          <h1 className="text-[35px] font-bold text-center pt-[20px]">
            Checkout Page
          </h1>
          <h3 className="text-[16px] font-medium text-center">
            Home -- Checkout Page
          </h3>
        </div>
        <form onSubmit={orderPlaced}>
          <div className="grid grid-cols-[70%_auto] gap-[10px]">
            <div>
              <div className="w-full bg-black text-white">
                <h3 className="px-[10px] text-[17px] py-[5px]">
                  BILLING DETAILS
                </h3>
              </div>
              <div className="border border-black px-[10px]">
                <div className="grid grid-cols-2 gap-[20px] my-[10px]">
                  <div>
                    <label className="text-black text-[15px] font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                    />
                  </div>
                  <div>
                    <label className="text-black text-[15px] font-semibold">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                      }
                      name="number"
                      className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[20px] my-[10px]">
                  <div>
                    <label className="text-black text-[15px] font-semibold">
                      Billing Name
                    </label>
                    <input
                      name="billingname"
                      type="text"
                      value={formData.billingname}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          billingname: e.target.value,
                        })
                      }
                      className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                    />
                  </div>
                  <div>
                    <label className="text-black text-[15px] font-semibold">
                      Billing Email
                    </label>
                    <input
                      name="billingemail"
                      type="email"
                      value={formData.billingemail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          billingemail: e.target.value,
                        })
                      }
                      className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-black text-[15px] font-semibold">
                    Billing Mobile Number
                  </label>
                  <input
                    name="billingnumber"
                    type="text"
                    value={formData.billingnumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billingnumber: e.target.value,
                      })
                    }
                    className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                  />
                </div>
                <div>
                  <label className="text-black text-[15px] font-semibold">
                    Billing Address
                  </label>
                  <input
                    name="billingaddress"
                    type="text"
                    value={formData.billingaddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billingaddress: e.target.value,
                      })
                    }
                    className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                  />
                </div>
                <div>
                  <label className="text-black text-[15px] font-semibold">
                    Select Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                  >
                    <option value="">select country</option>
                    {countryList.map((items, index) => (
                      <option key={index} value={items._id}>
                        {items.countryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-[20px] my-[10px]">
                  <div>
                    <label className="text-black text-[15px] font-semibold">
                      State
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      type="text"
                      className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                    />
                  </div>
                  <div>
                    <label className="text-black text-[15px] font-semibold">
                      City
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      type="text"
                      className="w-full px-[10px] border border-black text-black text-[13px] py-[7px]"
                    />
                  </div>
                </div>
                <label className="text-black text-[15px] font-semibold">
                  Order Notes
                </label>
                <input
                  name="ordernotes"
                  value={formData.ordernotes}
                  onChange={(e) =>
                    setFormData({ ...formData, ordernotes: e.target.value })
                  }
                  type="textbox"
                  className="w-full px-[10px] border border-black text-black text-[13px] h-[80px] mb-[20px]"
                  placeholder="Notes about your order, e.g., special notes for delivery"
                />
              </div>
            </div>

            <div className="border border-black">
              <div className="w-full bg-black text-white">
                <h3 className="px-[10px] text-[17px] py-[5px]">YOUR ORDER</h3>
              </div>

              <div className="grid grid-cols-2 bg-gray-100 text-black text-center py-[5px]">
                <h2>Product</h2>
                <h2>Total</h2>
              </div>

              {cart.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 text-center py-[3px]"
                  >
                    <div className="text-black">
                      {items.title} x {items.qty}
                    </div>
                    <div className="text-black">
                      Rs. {items.price * items.qty}
                    </div>
                  </div>
                );
              })}
              <div className="grid grid-cols-2 text-center border-y border-gray-400 my-[15px] py-[5px]">
                <div className="text-black">Cart Subtotal</div>
                <div className="text-black">
                  Rs.
                  {cart.reduce((total, obj) => total + obj.price * obj.qty, 0)}
                </div>
              </div>
              <h2 className="text-[15px] text-black mt-[20px] ms-[20px] mb-[5px]">
                Payment Method
              </h2>
              <div className="flex text-black gap-[20px] ms-[20px]">
                <div>
                  <input
                    value="1"
                    checked={PaymentMethod === "1"}
                    onChange={() => setPaymentMethod("1")}
                    type="radio"
                    name="payment"
                  />
                  <label className="text-[13px]">Online</label>
                </div>
                <div>
                  <input
                    value="2"
                    checked={PaymentMethod === "2"}
                    onChange={() => setPaymentMethod("2")}
                    type="radio"
                    name="payment"
                  />
                  <label className="text-[13px]">Cash On Delivery</label>
                </div>
              </div>
              <button className="text-white font-semibold bg-amber-600 py-[5px] px-[10px] rounded mt-[20px] ms-[20px] text-[15px]">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

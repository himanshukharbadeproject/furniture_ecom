import React from "react";

export default function NewsletterSection() {
  return (
    <div className="w-full bg-white text-black">
      <div className="w-[1320px] mx-auto">
        <div className="flex-col items-center border border-black pt-12">
          <h2 className="text-center text-[26px] font-semibold">Our Newsletter</h2>
          <h3 className="text-center text-[15px] mt-1.5 text-gray-700 font-light">Get E-mail updates about our latest shop and special offers.</h3>
          <div className="flex justify-center mt-7 h-[45px] mb-[50px]">
            <input type="text" className="border border-gray-500 w-[500px] px-3 text-gray-600" placeholder="Email address..." />
            <button className="border border-black px-15 font-bold bg-yellow-500 text-white">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

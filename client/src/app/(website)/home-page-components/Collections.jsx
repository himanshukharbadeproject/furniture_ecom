import React from "react";

export default function Collections() {
  return (
    <div className="w-full bg-white border border-gray-200 py-8">
      <div className="w-[1320px] mx-auto">
        <div className="grid grid-cols-3 gap-5">
          <div className="relative cursor-pointer group overflow-hidden">
            <div className="p-5 text-black absolute top-0 left-0 z-10">
              <h4 className="text-[15px] font-medium">Design Creative</h4>
              <h5 className="text-2xl font-bold">Chair Collection</h5>
            </div>
            <div className="group-hover:scale-[1.1] ">
              <img src="https://images.woodenstreet.de/image/cache/data/china-furniture/carolina-lounge-chair-brown/WSCHAIR-86770/new-logo/1-810x702.jpg" className="h-[350px]"/>
            </div>
          </div>
          <div className="relative cursor-pointer group overflow-hidden ">
            <div className="p-5 text-black absolute top-0 left-0 z-10">
              <h4 className="text-[15px] font-medium">Bestselling Products</h4>
              <h5 className="text-2xl font-bold">Chair Collection</h5>
            </div>
            <div className="group-hover:scale-[1.1] ">
              <img src="https://dwella.in/cdn/shop/files/1_Ivy__A_19a4ce24-5f2a-40a9-9601-e3a14f733a47.jpg?v=1713167030&width=533" className="h-[350px]"/>
            </div>
          </div>
          <div className="relative cursor-pointer group overflow-hidden">
            <div className="p-5 text-black absolute top-0 left-0 z-10">
              <h4 className="text-[15px] font-medium">Onsale Products</h4>
              <h5 className="text-2xl font-bold">Chair Collection</h5>
            </div>
            <div className="group-hover:scale-[1.1]">
              <img src="https://m.media-amazon.com/images/I/6122lKuOE6L._AC_UF1000,1000_QL80_.jpg" className="h-[350px]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp"/>

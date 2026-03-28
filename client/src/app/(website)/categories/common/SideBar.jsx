"use client"
import React from "react";
import PriceSlider from "./PriceSlider";

export default function SideBar() {
  return (
    <div className="bg-white text-black pb-2.5 mt-10">
      <div className="h-[440px] overflow-y-scroll">
        <h3 className="text-black font-semibold text-[23px] py-4">
          Categories
        </h3>
        <h4 className="text-black font-semibold text-[20px] mb-2">Tables</h4>
        <div className="flex gap-2.5 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>

        <h4 className="text-black font-semibold text-[20px] my-2">Mirror</h4>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>

        <h4 className="text-black font-semibold text-[20px] my-2">
          Living Storage/ Collections
        </h4>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>

        <h4 className="text-black font-semibold text-[20px] mb-2">Tables</h4>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Side and End Tables</span>
        </div>

      </div>
      <div className="my-4">
        <h4 className="text-black font-semibold text-[23px] mb-2">Material</h4>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Rose Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Teak Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Satin Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Sal Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Marandi Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Mahogany Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Mulberry Wood</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">JackFruit</span>
        </div>
      </div>
      <div className="my-4">
        <h4 className="text-black font-semibold text-[23px] mb-2">Color</h4>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Burnt Amber</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Golden Teak</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Carbon Black</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Faded Oak</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Weathered French Grey</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Cobalt Blue</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Mango Green</span>
        </div>
        <div className="flex gap-2 py-1.5">
          <input type="checkbox" class="big-checkbox" />
          <span className="text-[15px]">Black Finish</span>
        </div>
      </div>
      <div className="my-4">
        <h4 className="text-black font-semibold text-[23px] mb-2">
          Filter By Price
        </h4>
        <PriceSlider/>
      </div>
    </div>
  );
}



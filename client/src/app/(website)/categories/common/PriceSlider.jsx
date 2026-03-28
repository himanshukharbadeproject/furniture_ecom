import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function PriceRange() {
  const [range, setRange] = useState([10, 80]);

  return (
    <div className="p-5 w-[300px]">
      <RangeSlider
        min={0}
        max={10000}
        defaultValue={range}
        onInput={setRange}
      />
      <h2 className="text-[14px] font-bold text-gray-700 my-3">
        Price Range: ₹{range[0]} – ₹{range[1]}
      </h2>
    </div>
  );
}

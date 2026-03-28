import React, { useState } from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker({onColorChange}) {
  const [color, setColor] = useState("#000000");

  return (
    <div>
        <SketchPicker
        color={color}
        onChangeComplete={(updatedColor) => {
          // console.log(updatedColor.hex)
          setColor(updatedColor.hex);
          onColorChange(updatedColor.hex)
        }}
      />
    </div>
  );
}

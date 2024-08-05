import { COLORS } from "@/constants";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export default function IncDecCounter({ setValue, value, max }) {
  const handleChange = (e) => {
    setValue(e);
  };
  return (
    <div className="flex">
      <div
        className="h-[30px] w-[30px] text-white text-[16px] flex justify-center items-center cursor-pointer hover:opacity-80"
        style={{ background: COLORS.gray }}
        onClick={() => {
          if (value > 1) {
            setValue(value - 1);
          }
        }}
      >
        <MinusOutlined />
      </div>
      <input
        value={value}
        className="border-none outline-none h-[30px] w-[70px] pl-[20px] pr-[20px]"
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            handleChange(Number(e.target.value));
          } else {
            return;
          }
        }}
      />
      <div
        className="h-[30px] w-[30px] text-white text-[16px] flex justify-center items-center cursor-pointer hover:opacity-80"
        style={{ background: COLORS.gray }}
        onClick={() => {
          if (value < max) {
            setValue(value + 1);
          }
        }}
      >
        <PlusOutlined />
      </div>
    </div>
  );
}

import React from "react";

export default function Cart() {
  const cart = false;

  if (!cart) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div>Cart is Empty</div>
      </div>
    );
  }
  return (
    <div>
      <div>asdas</div>
    </div>
  );
}

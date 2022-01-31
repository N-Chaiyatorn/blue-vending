import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState, totalPriceState } from "../atoms/CartItemsAtom";

function Cart() {
  const [cartItems, setCartItem] = useRecoilState(cartItemsState);
  const totalPrice = useRecoilValue(totalPriceState);

  return (
    <div className="flex flex-col items-center border-2 p-4 bg-sky-100 overflow-y-auto scrollbar-hide basis-1/4 shadow-xl">
      <div className="text-4xl w-full font-medium text-center mt-2 mb-3 pb-6 border-b-4 border-yellow-100">
        My cart
      </div>
      <div className="flex w-full my-3 px-4 text-xl font-semibold">
        <p>Total</p>
        <p className="ml-auto">{totalPrice} ฿</p>
      </div>
      {cartItems.length > 0 &&
        cartItems.map((item, index) => (
          <div
            key={item.name + index}
            className={
              "flex flex-shrink-0 items-center w-full my-3 p-5 bg-yellow-50 shadow-md rounded-md " +
              (index === cartItems.length - 1 && "mb-8")
            }
          >
            <p className="text-md font-medium">{item.name}</p>
            <p className="italic text-slate-600 ml-3">x{item.qty}</p>
            <p className="ml-auto text-md font-medium">
              {item.price * item.qty} ฿
            </p>
          </div>
        ))}
      {cartItems.length ? (
        <Link href="/checkout" passHref>
          <div
            className="w-40 mt-auto mb-20 p-4 text-center text-xl text-gray-100 font-bold rounded-md 
          duration-300 shadow-md hover:cursor-pointer bg-sky-700 hover:bg-sky-900"
          >
            Check out
          </div>
        </Link>
      ) : (
        <div
          className="w-40 mt-auto mb-20 p-4 text-center text-xl text-gray-100 font-bold rounded-md 
        duration-300 shadow-md cursor-not-allowed bg-gray-500"
        >
          Check out
        </div>
      )}
    </div>
  );
}

export default Cart;

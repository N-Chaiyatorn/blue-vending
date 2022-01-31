import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartItemsState, totalPriceState } from "../atoms/CartItemsAtom";

function ProductCard({ name, price, imgSource, qty }) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const handleClick = () => {
    const productObject = {
      name: name,
      price: price,
    };

    const matchedCartItem = cartItems.filter((item) => {
      return item.name === name;
    });

    if (matchedCartItem.length) {
      productObject["qty"] = matchedCartItem[0]["qty"] + 1;

      if (productObject["qty"] > qty) {
        alert(`Sorry, ${productObject["name"]} is out of stock`);
        return;
      }

      const index = cartItems.findIndex((item) => item.name === name);
      const new_cartItems = cartItems.filter((item) => {
        return item.name !== name;
      });
      new_cartItems.splice(index, 0, productObject);
      setCartItems(new_cartItems);

      let totalPrice = 0;
      new_cartItems.forEach((item) => {
        totalPrice = totalPrice + item.price * item.qty;
      });
      setTotalPrice(totalPrice);
    } else {
      productObject["qty"] = 1;
      const new_cartItems = [...cartItems, productObject];
      setCartItems(new_cartItems);

      let totalPrice = 0;
      new_cartItems.forEach((item) => {
        totalPrice = totalPrice + item.price * item.qty;
      });
      setTotalPrice(totalPrice);
    }
  };

  return (
    <div
      className="flex-col bg-sky-100 rounded-2xl overflow-hidden shadow-md duration-300
    hover:shadow-xl hover:bg-blue-300 hover:-translate-y-1 hover:translate-x-1 hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-center pt-6">
        <img
          src={imgSource}
          alt="{name} logo"
          className="object-contain h-32"
          draggable="false"
        />
      </div>
      <div className="flex px-5 pt-5 items-center justify-between">
        <span>{name}</span>
        <span className="text-lg font-semibold">{price} ฿</span>
      </div>
      <div className="flex px-5 pt-2 pb-4 items-center justify-between">
        <span>Product left:</span>
        <span className="text-lg font-semibold">{qty} pcs</span>
      </div>
    </div>
  );
}

export default ProductCard;

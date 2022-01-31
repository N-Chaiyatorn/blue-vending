import { atom, selector } from "recoil";

const cartItemsState = atom({
  key: "cartItemsState",
  default: [],
});

const totalPriceState = atom({
  key: "totalPriceState",
  default: 0
});

export { cartItemsState, totalPriceState };

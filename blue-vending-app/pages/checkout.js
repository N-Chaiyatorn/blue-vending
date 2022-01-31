import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState, totalPriceState } from "../atoms/CartItemsAtom";
import Header from "../components/Header";
import calculateChange from "../util/calculateChange";
import remainingMoneyMap from "../util/mockMoney";

const bankButtonStyle = `flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 
text-xl border-4 text-white py-2 px-4 mx-1 rounded font-medium shadow-md`;

const coinButtonStyle = `flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 
text-xl border-4 text-white py-3 px-3 mx-1 rounded-full font-medium shadow-md`;

export default function Checkout() {
  const totalPrice = useRecoilValue(totalPriceState);
  const [depositMoney, setDepositMoney] = useState(0);
  const [remainingMoney, setRemainingMoney] = useState(remainingMoneyMap);

  const deposit = async (addAmount) => {
    setDepositMoney(depositMoney + addAmount);
  };

  useEffect(() => {
    if (depositMoney >= totalPrice) {
      const change = depositMoney - totalPrice;
      let [isEnough, changeMap, newRemainingMoney] = calculateChange(
        change,
        remainingMoney
      );

      if (totalPrice > 0 && isEnough) {
        setRemainingMoney[newRemainingMoney];
        const changeArray = Object.entries(changeMap);
        let reportString = `Total change: ${change}`;
        changeArray.forEach((map) => {
          if (map[1]) {
            reportString = reportString + `\n ${map[0]}฿:${map[1]}pcs`;
          }
        });
        alert("Please receive your change, thank you!\n" + reportString);
      } else if (!isEnough) {
        alert("Sorry, we have no enough change");
      } else {
        alert("Please select at least one product");
      }

      window.location.replace("http://localhost:3000");
    }
  }, [totalPrice, depositMoney, remainingMoney]);

  return (
    <div className="bg-cyan-50 w-screen h-screen overflow-hidden select-none">
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/bluepi.png" />
      </Head>

      <Header />
      <div className="flex flex-col w-screen items-center justify-center text-3xl text-cyan-700 mt-[10vh]">
        <div className="flex-shrink-0 py-4">Total Price: {totalPrice} ฿</div>
        <div className="flex-shrink-0 py-4">Deposit: {depositMoney} ฿</div>

        <div className="flex items-center justify-center border-b border-teal-500 py-4">
          <button
            className={coinButtonStyle}
            type="button"
            onClick={() => deposit(1)}
          >
            1 ฿
          </button>
          <button
            className={coinButtonStyle}
            type="button"
            onClick={() => deposit(5)}
          >
            5 ฿
          </button>
          <button
            className={coinButtonStyle}
            type="button"
            onClick={() => deposit(10)}
          >
            10 ฿
          </button>
        </div>

        <div className="flex items-center justify-center border-b border-teal-500 py-4">
          <button
            className={bankButtonStyle}
            type="button"
            onClick={() => deposit(20)}
          >
            20 ฿
          </button>
          <button
            className={bankButtonStyle}
            type="button"
            onClick={() => deposit(50)}
          >
            50 ฿
          </button>
          <button
            className={bankButtonStyle}
            type="button"
            onClick={() => deposit(100)}
          >
            100 ฿
          </button>
          <button
            className={bankButtonStyle}
            type="button"
            onClick={() => deposit(500)}
          >
            500 ฿
          </button>
          <button
            className={bankButtonStyle}
            type="button"
            onClick={() => deposit(1000)}
          >
            1000 ฿
          </button>
        </div>

        <Link href="/" passHref>
          <div
            className="flex flex-shrink-0 w-auto mt-5 p-4 text-center text-xl text-gray-100 font-bold rounded-md 
          duration-300 shadow-md hover:cursor-pointer bg-sky-700 hover:bg-sky-900"
          >
            To products page
          </div>
        </Link>
      </div>
    </div>
  );
}

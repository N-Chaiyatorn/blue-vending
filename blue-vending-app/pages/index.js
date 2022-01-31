import Head from "next/head";
import Cart from "../components/Cart";
import Header from "../components/Header";
import Products from "../components/Products";

export default function Home() {

  return (
    <div className="bg-cyan-50 w-screen h-screen overflow-hidden select-none">
      <Head>
        <title>Blue Vending Machine</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/bluepi.png" />
      </Head>

      <Header />

      <div className="flex overflow-hidden h-[calc(100vh_-_20px)]">
        <Products />
        <Cart />
      </div>
      {/* footer (Progress bar) */}
    </div>
  );
}

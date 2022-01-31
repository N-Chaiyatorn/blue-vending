import React from "react";
import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";

function Products() {
  const [isFetched, isError, stocks] = useFetch("http://0.0.0.0:8080/products/")

  return (
    <div className="overflow-y-auto scrollbar-hide basis-3/4">
      <div
        className="grid grid-cols-1 gap-10 px-12 pt-10 pb-32
      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {stocks && stocks.map((item, index) => (
            <ProductCard key={index} name={item.name} price={item.price} imgSource={item.imgSource} qty={item.qty}/>
          )
        )}
      </div>
    </div>
  );
}

export default Products;

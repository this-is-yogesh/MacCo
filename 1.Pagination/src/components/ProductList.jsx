import React, { useState, useEffect, useCallback, useMemo } from "react";
// import Pagination from "./Pagination/Pagination";
import "../index.css";
import useGETData from "../hooks/useGETdata";
import { ProductDescription } from "./ProductDescription";

const ProductList = () => {
  let { data: datas } = useGETData("https://dummyjson.com/products");
  let [count, setChange] = useState(0);

  function childPropFunction() {
    console.log("usecallbackexample");
  }
  let mappedData = useCallback(() => {
    console.log("usememo");
    let data = datas?.map(item => (
      <div key={item.id}>
        <ProductDescription item={item} childPropFunction={childPropFunction} />
      </div>
    ));
    return data;
  }, [datas]);

  return (
    <div>
      <h1>Proudcts List</h1>
      <button
        onClick={() => setChange(prev => prev + 1)}
        style={{ background: "whitesmoke" }}
      >
        {count}
      </button>
      {mappedData()}
    </div>
  );
};

export default ProductList;

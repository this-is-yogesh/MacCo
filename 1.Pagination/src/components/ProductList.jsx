import React, { useState, useEffect, useCallback,useMemo } from "react";
// import Pagination from "./Pagination/Pagination";
import "../index.css";
import useGETData from "../hooks/useGETdata";
import { ProductDescription } from "./ProductDescription";

const ProductList = () => {
  let { data: datas } = useGETData("https://dummyjson.com/products");

  let mappedData = useMemo(() => {
    let data = datas?.map(item => (
      <div key={item.id}>
        <ProductDescription item={item} />
      </div>
    ));
    return data;
  }, [datas]);

  return (
    <div>
      <h1>Proudcts List</h1>
      {mappedData}
    </div>
  );
};

export default ProductList;

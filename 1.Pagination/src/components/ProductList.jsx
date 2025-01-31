import React, { useState, useEffect, useCallback, useMemo } from "react";
// import Pagination from "./Pagination/Pagination";
import "../index.css";
import "../App.css";
import useGETData from "../hooks/useGETdata";
import { ProductDescription } from "./ProductDescription";

const ProductList = () => {
  let { data: datas } = useGETData("https://dummyjson.com/products");
  let [searchValue, setSearchValue] = useState("");
  let [searchedData, setSearchedData] = useState(datas);

  useEffect(() => {
    if (datas) {
      setSearchedData(datas);
    }
  }, [datas]);

  let mappedData = useMemo(() => {
    console.log("usememo");
    let data = searchedData?.map(item => (
      <div key={item.id} style={{ width: "100%" }}>
        <ProductDescription item={item} />
      </div>
    ));
    return data;
  }, [searchedData, searchValue]);

  function handleSearchValue(text) {
    setSearchValue(text);
    let searchedData = datas.filter(item => {
      return item.title.toLowerCase().trim().includes(text.toLowerCase());
    });
    setSearchedData(searchedData);
  }
  return (
    <div>
      <div className="product-list-container">
        <h1>Proudcts List</h1>
        <div>
          <input
            placeholder="Search any item"
            value={searchValue}
            onChange={e => handleSearchValue(e.target.value)}
            style={{
              height: 30,
              width: 180,
              borderRadius: "5%",
              outline: "none",
              borderWidth: "1px",
              fontSize: 15,
            }}
          />
        </div>
      </div>
      <div style={{ width: "90%", margin: "0px 20px" }}>
        <div style={{ marginTop: 150 }}>{mappedData}</div>
      </div>
    </div>
  );
};

export default ProductList;

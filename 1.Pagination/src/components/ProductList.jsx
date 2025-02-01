import React, { useState, useEffect, useCallback, useMemo } from "react";
// import Pagination from "./Pagination/Pagination";
import "../index.css";
import "../App.css";
import useGETData from "../hooks/useGETdata";
import { ProductDescription } from "./ProductDescription";
import Pagination from "./Pagination";

const ProductList = () => {
  let { data: datas } = useGETData("https://dummyjson.com/products");
  let [searchValue, setSearchValue] = useState("");
  let [searchedData, setSearchedData] = useState(datas);
  let [totalPages, setTotalPages] = useState([]);
  let [index, setIndexes] = useState([1, 11]);
  let [timeOutId, setTimeOutId] = useState();

  useEffect(() => {
    if (datas) {
      setSearchedData(datas.slice(index[0] - 1, index[1]));
    }
    let len = Math.floor(datas?.length / 10);
    let total = Array.from({ length: len }, (_, i) => i + 1);
    setTotalPages(total);
  }, [datas]);

  function callback(first, last) {
    let searchedData = datas.slice(first, last + 1);
    let arr = [first, last + 1];
    setIndexes(arr);
    setSearchedData(searchedData);
  }

  // let firstIndex = pageNumber * pageLength - pageLength + 1;
  // let lastIndex = pageNumber * pageLength;

  let mappedData = useMemo(() => {
    let data = searchedData?.map(item => (
      <div key={item.id} style={{ width: "100%" }}>
        <ProductDescription item={item} />
      </div>
    ));
    return data;
  }, [searchValue, searchedData]);

  let cb = function (text) {
    let searchedData = datas.filter(item => {
      return item.title.toLowerCase().trim().includes(text.toLowerCase());
    });
    setSearchedData(searchedData);
  };
  function myDebounce(cb,delay) {
    let id;
    return function (text) {
      clearTimeout(id);
      id = setTimeout(() => {
        cb(text);
      }, delay);
    };
  }

  let debounce = myDebounce(cb, 1000);

  function handleSearchValue(text) {
    if (!text.length) {
      setSearchValue(text);
      callback(index[0], index[1]);
      return;
    }
    setSearchValue(text);
    debounce(text);
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
      <div style={{ width: "90%", margin: "0px 20px" }}>
        {totalPages.length && (
          <Pagination
            data={datas}
            callback={callback}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;

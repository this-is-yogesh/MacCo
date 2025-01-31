import { useEffect, useState } from "react";

export default function Pagination({ data: datas, callback, totalPages }) {
  let [pageNumber, setPageNumber] = useState(1);
  let pageLength = 10;

  function changePage(pageNumber) {
    console.log(pageNumber, "pageNumber");
    if (pageNumber <= 0 || pageNumber > totalPages.length) {
      return;
      //setPageNumber(pageNumber);
      // callback(
      //   pageNumber * pageLength - pageLength + 1,
      //   pageNumber * pageLength
      // );
    } else {

      setPageNumber(pageNumber);
      callback(
        pageNumber * pageLength - pageLength + 1,
        pageNumber * pageLength
      );
    }
  }
  return (
    <div className="pageBigBox">
      <button className="leftarrow" onClick={() => changePage(pageNumber - 1)}>
        {"←"}
      </button>
      {totalPages?.map((page, index) => (
        <button
          className="pageSmallBox"
          key={page + index}
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}
      <button className="righarrow" onClick={() => changePage(pageNumber + 1)}>
        {"→"}
      </button>
    </div>
  );
}

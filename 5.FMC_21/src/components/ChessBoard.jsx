import "./ChessBoard.css";
import { useState } from "react";

function ChessBoard() {
  const [colored, setCheckColored] = useState({});
  function getRowsandCols(index) {
    let rows = Math.floor(index / 8);
    let cols = index % 8;
    return [rows, cols];
  }

  function getColor(index) {
    let row = Math.floor(index / 8);
    let even = row % 2 === 0;
    let col = index % 8;
    if (even && col % 2 === 0) {
      return "blackBox";
    } else if (!even && col % 2 !== 0) {
      return "blackBox";
    }
  }

  function getIndex(r, c) {
    let index = r * 8;
    let finalIndex = index + c;
    return finalIndex;
  }
  function hoveringOver(index) {
    let grid = getRowsandCols(index);
    let sumGrid = grid[0] + grid[1];
    let row = grid[0];
    let col = grid[1];
    let obj = {};
    let secondObj = {};
    let thirdObj = {};
    new Array(64).fill(1).forEach((_, id) => {
      let otherGrid = getRowsandCols(id);
      let otherSum = otherGrid[0] + otherGrid[1];
      if (otherSum === sumGrid) {
        obj[id] = true;
      }
      let upperRow = row;
      let upperCol = col;
      while (upperRow >= 0 && upperCol >= 0) {
        upperRow--;
        upperCol--;
        let id = getIndex(upperRow, upperCol);
        console.log(id, "id");
        secondObj[id] = true;
      }
      while (upperRow >= 0 && upperCol >= 0) {
        upperRow--;
        upperCol--;
        let id = getIndex(upperRow, upperCol);
        console.log(id, "id");
        secondObj[id] = true;
      }
      while (upperRow <= 7 && upperCol <= 7) {
        upperRow++;
        upperCol++;
        let id = getIndex(upperRow, upperCol);
        console.log(id, "id");
        thirdObj[id] = true;
      }
    });
    setCheckColored({ ...secondObj, ...obj, ...thirdObj });
    return grid;
  }
  return (
    <div>
      <div className="mainContainer">
        <div className="boxContainer">
          {Array.from({ length: 64 }, (_, index) => {
            {
              return (
                <div
                  className={`${"box"} 
                  ${getColor(index)} ${colored?.[index] ? "coloredBox" : ""}
                  `}
                  onMouseOver={() => hoveringOver(index)}
                >
                  {getRowsandCols(index)}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;

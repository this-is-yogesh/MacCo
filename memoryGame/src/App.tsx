import { useState, useEffect, useRef } from "react";
import "./App.css";
import React from "react";

function App() {
  const [gridSize, setGridSize] = useState<string>("0");
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [selectedBox2, setSelectedBox2] = useState<number | null>(null);

  function changeGridSize(event: React.SyntheticEvent): void {
    const input = event?.target as HTMLInputElement;
    const value = input?.value;
    setGridSize(value);
    renderNumberInGrid(value);
  }

  function renderNumberInGrid(gridSize: string) {
    let totalGridSize: number = Number(gridSize) * Number(gridSize);
    let gridNumbersLength = totalGridSize / 2;
    if (totalGridSize % 2 !== 0) {
      totalGridSize += 1;
      gridNumbersLength = Math.floor(totalGridSize / 2) + 1;
    }
    const arr = new Array(gridNumbersLength).fill(0);
    const map = new Map();
    let i = 0;
    while (i < totalGridSize) {
      const num = Math.floor(Math.random() * gridNumbersLength + 1);
      console.log(map);
      if (!map.has(num) || !(map.get(num) == 2)) {
        arr[i] = num;
        map.set(num, (map.get(num) || 0) + 1);
      } else {
        continue;
      }
      i++;

      console.log(arr, "num");
    }
    setNumberArray(arr);
  }



  return (
    <div>
      <h2 className="headingMemory">Memory Game</h2>
      <div className="gridsize_container">
        <span>Grid Size:</span>
        <input
          type="number"
          placeholder="size"
          onChange={changeGridSize}
          value={gridSize}
          alt="gridSizeInput"
        />
      </div>
      <div className="grid_boxes_container">
        <div
          className="grid_boxes_outer"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {numberArray.map((box, index) => {
            return (
              <div
                className={`box_body ${
                  (selectedBox === index || selectedBox2 === index) &&
                  "selected_box"
                } `}
                key={index}
                onClick={() => clickBox(index)}
              >
                {(selectedBox === index || selectedBox2 === index) && box}
              </div>
            );
          })}
        </div>
      </div>
      <div className="reset_game_container">
        <button>Reset Game</button>
      </div>
    </div>
  );
}

export default App;

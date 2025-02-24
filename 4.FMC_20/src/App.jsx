import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [sizeProp, setSizeProp] = useState(0);
  let [boxesObj, setBoxesObj] = useState({});
  function getRows(index) {
    let row = Math.floor(index / sizeProp);
    let col = index % sizeProp;
    return [row, col];
  }
  useEffect(() => {
    let boxesContainer = document.querySelector(".boxesContainer");
    boxesContainer.style.setProperty("--size", sizeProp);
    let d = sizeProp * sizeProp;
    let arr = Array.from({ length: d }, (_, index) => {
      return { clicked: false, [index]: index };
    });
    setBoxesObj(arr);
  }, [sizeProp]);
  
  function clickingBox(i) {
    let arr = boxesObj.map(box => {
      if (box[i] === i) {
        box["clicked"] = true;
      }
      return box;
    });
    setBoxesObj(arr);
  }
  return (
    <div>
      <input
        type="number"
        value={sizeProp}
        onChange={e => setSizeProp(e.target.value)}
      />
      <div className="outermostContainer">
        <div className="boxesContainer">
          {boxesObj.length && boxesObj.map((box, index) => {
            let rc = getRows(index);
            let half = Math.floor(sizeProp / 2);
            if (rc[0] === half && rc[1] > 0) {
              return <div key={index}></div>;
            } else {
              return (
                <div
                  className={`${box.clicked ? "clickedBox" : "box"}`}
                  key={index}
                  onClick={() => clickingBox(index)}
                ></div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

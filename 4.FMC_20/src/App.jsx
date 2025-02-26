import { useState, useEffect } from "react";
import "./App.css";

let count = 0;
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
      let rc = getRows(index);
      let half = Math.floor(sizeProp / 2);
      if (rc[0] === half && rc[1] > 0) {
        return { nonbox: true };
      } else {
        return { clicked: false, [index]: index, order: 0 };
      }
    });
    setBoxesObj(arr);
    console.log(arr, "arr##");
  }, [sizeProp]);

  function triggerReverse() {
    let origianlBoxes = boxesObj.filter(b => !b.nonbox);
    origianlBoxes.sort((a, b) => a["order"] - b["order"]);
    console.log(origianlBoxes, "origianlBoxesSort");
    let i = 1;
    while (i <= origianlBoxes.length) {
      (function (ind) {
        setTimeout(() => {
          let arr = origianlBoxes.map(element => {
            if (element["order"] === ind) {
              element["clicked"] = false;
              return element;
            } else {
              return element;
            }
          });
          console.log(arr, "arr^^", ind);
          setBoxesObj(arr);
        }, ind * 1000);
      })(i++);
    }
  }
  function clickingBox(i) {
    count++;
    let arr = boxesObj.map(box => {
      if (box[i] === i) {
        box["clicked"] = true;
        box["order"] = count;
      }
      return box;
    });
    console.log(arr, "origianlBoxes");
    setBoxesObj(arr);
    let origianlBoxes = arr.filter(b => !b.nonbox);
    console.log(origianlBoxes, "origianlBoxes", count);
    if (count === origianlBoxes.length) {
      triggerReverse();
    }
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
          {boxesObj.length &&
            boxesObj.map((box, index) => {
              let rc = getRows(index);
              let half = Math.floor(sizeProp / 2);
              if (rc[0] === half && rc[1] > 0) {
                return <div key={index}></div>;
              } else {
                return (
                  <div
                    className={`${box?.clicked ? "clickedBox" : "box"}`}
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

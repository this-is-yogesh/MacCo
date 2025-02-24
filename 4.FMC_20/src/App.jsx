import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [sizeProp, setSizeProp] = useState(0);
  function getRows(index) {
    let row = Math.floor(index / sizeProp);
    let col = index % sizeProp;
    return [row, col];
  }
  useEffect(() => {
    let boxesContainer = document.querySelector(".boxesContainer");
    boxesContainer.style.setProperty("--size", sizeProp);
  }, [sizeProp]);
  return (
    <div>
      <input
        type="number"
        value={sizeProp}
        onChange={e => setSizeProp(e.target.value)}
      />
      <div className="outermostContainer">
        <div className="boxesContainer">
          {new Array(sizeProp * sizeProp).fill(0).map((box, index) => {
            let rc = getRows(index);
            let half = Math.floor(sizeProp / 2);
            if (rc[0] === half && rc[1] > 0) {
              return <div key={index}></div>;
            } else {
              return <div className="box" key={index}></div>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

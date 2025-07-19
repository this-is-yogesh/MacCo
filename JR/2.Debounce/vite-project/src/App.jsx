import { useState, useEffect } from "react";
import "./App.css";
import useDebounce from "./customHook/Debounce";

function App() {
  const [value, setValue] = useState("");
  const styles = getStyles();

  const [debounced] = useState(() => {
    let timeOut = null;
    console.log("Debounced0:");
    return function (args, delay) {
      console.log("Debounced1:", args);
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        callFunction(args);
      }, delay);
    };
  });

  function callFunction(val) {
    console.log(val, "debounce", val.length);
  }

  function textChange(e) {
    setValue(e.target.value);
    debounced(e.target.value, 1500);
  }

  return (
    <div style={styles.outerBox}>
      <input
        type="text"
        value={value}
        placeholder="write here"
        style={styles.inputBox}
        onChange={e => textChange(e)}
      />
    </div>
  );
}

function getStyles() {
  return {
    outerBox: { fontSize: "20px" },
    inputBox: {
      width: "15em",
      height: "1.5em",
      position: "fixed",
      top: 0,
      left: 0,
      transform: "translate(30em,10em)",
      fontSize: "1em",
    },
  };
}

export default App;

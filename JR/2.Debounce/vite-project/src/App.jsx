import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const styles = getStyles();

  function textChange(e) {
    setValue(e.target.value);
  }
  return (
    <div style={styles.outerBox}>
      <input
        type="text"
        value={value}
        placeholder="write here"
        style={styles.inputBox}
        onChange={textChange}
      />
    </div>
  );
}

function getStyles() {
  return {
    outerBox: {fontSize:'20px'},
    inputBox: {
      width: "15em",
      height: "1.5em",
      position: "fixed",
      top: 0,
      left: 0,
      transform:"translate(30em,10em)",
      fontSize:'1em'
    },
  };
}

export default App;

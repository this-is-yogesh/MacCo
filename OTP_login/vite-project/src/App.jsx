import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");

  const inputRef1 = useRef("");
  const inputRef2 = useRef("");
  const inputRef3 = useRef("");

  function setValueInput(event, setVal, nextRef) {
    const lastChar = event.target.value?.slice(-1);
    setVal(lastChar);
    if (lastChar && nextRef) {
      nextRef.current.focus();
    }
  }

  function pressKeyDown(event, setVal, prevRef) {
    if (event.key === "Backspace") {
      if (event.target.value) {
        // If there's a value, just clear it
        setVal("");
        prevRef.current.focus();
      } else if (prevRef) {
        // If empty, move focus to previous input
        prevRef.current.focus();
      }
    }
  }
  return (
    <div>
      <div className="mainBox">
        <div className="parentOTP">
          <p>Enter the input in given box below:</p>
          {/* box  */}
          <div className="otpParentContainer">
            <input
              ref={inputRef1}
              onChange={e => {
                setValueInput(e, setVal1, inputRef2);
              }}
              type="text"
              value={val1}
              onKeyDown={e => {
                pressKeyDown(e, setVal1, null);
              }}
            />
            <input
              ref={inputRef2}
              onChange={e => {
                setValueInput(e, setVal2, inputRef3);
              }}
              type="text"
              value={val2}
              onKeyDown={e => {
                pressKeyDown(e, setVal2, inputRef1);
              }}
            />
            <input
              ref={inputRef3}
              onChange={e => {
                setValueInput(e, setVal3, null);
              }}
              type="text"
              value={val3}
              onKeyDown={e => {
                pressKeyDown(e, setVal3, inputRef2);
              }}
            />
            {/* <input
              onChange={e => {
                setValueInput(e);
              }}
              type="text"
              value={val1}
            /> */}
          </div>
        </div>
        <div className="buttonContainer">
          <button className="buttonStyle">Submit OTP</button>
        </div>
      </div>
    </div>
  );
}

export default App;

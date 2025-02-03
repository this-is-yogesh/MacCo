import "./App.css";
import { useState } from "react";

function App() {
  const [player, setPlayer] = useState("");

  return (
    <div className="mainBox">
      <input
        placeholder="Enter Player Name"
        value={player}
        onChange={e => {
          setPlayer(e.target.value);
        }}
      />
      <button>Add</button>
    </div>
  );
}

export default App;

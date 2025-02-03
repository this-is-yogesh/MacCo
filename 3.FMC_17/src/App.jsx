import "./App.css";
import { useState } from "react";

function App() {
  const [player, setPlayer] = useState("");
  const [masterTeam, setMasterTeam] = useState([]);

  function fnaddplayer(player) {
    console.log(player);
    return <button>+</button>;
  }
  function dladdplayer() {
    return <button>-</button>;
  }
  function addtoMasterTeam(e) {
    e.preventDefault()
    let tempArr = [...masterTeam];
    let obj = {
      player:player,
      addplayer: fnaddplayer(player),
      deletePlayer: dladdplayer(player),
    };
    console.log([...tempArr, obj], "masterteam");
    setMasterTeam([...tempArr, obj]);
    setPlayer("")
  }

  return (
    <div>
      <form className="mainBox" onSubmit={addtoMasterTeam}>
        <input
          placeholder="Enter Player Name"
          value={player}
          onChange={e => {
            setPlayer(e.target.value);
          }}
        />
        <button onClick={addtoMasterTeam}>Add</button>
      </form>
      {masterTeam.length ? (
        <div className="masterTeamBox">
          <h3>Master Team</h3>
          {masterTeam.map((teamPlayer, index) => (
            <div key={index} className="playerDiv">
              <div style={{ fontSize: "20px", width: "20%" }}>
                {teamPlayer.player}
              </div>
              <div>{teamPlayer.addplayer}</div>
              <div>{teamPlayer.deletePlayer}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;

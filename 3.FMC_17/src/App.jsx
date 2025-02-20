import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState("");
  const [masterTeam, setMasterTeam] = useState([]);
  const [playing, setPlaying] = useState([]);

  function fnaddplayer(player) {
    console.log(player, "player");
    return <button onClick={() => addtoplaying(player)}>+</button>;
  }
  function dladdplayer() {
    return <button onClick={() => removePlayer(player)}>-</button>;
  }

  function addtoplaying(player) {
    console.log(player, "adding");
    setPlaying(prev => {
      return [...prev, player];
    });
  }

  function removePlayer(player) {
    console.log(player, "removeplaying", playing);
    setPlaying(prev => {
      return prev.filter(p => p !== player);
    });
  }

  function addtoMasterTeam(e) {
    e.preventDefault();
    let tempArr = [...masterTeam];
    if (!player.length) {
      return;
    }
    let obj = {
      player: player,
      addplayer: fnaddplayer(player),
      deletePlayer: dladdplayer(player),
    };
    console.log([...tempArr, obj], "masterteam");
    setMasterTeam([...tempArr, obj]);
    setPlayer("");
  }

  const PlayingEleven = function () {
    return (
      <div>
        <div>
          <h1>Playing 11</h1>
          {playing.map((player, index) => {
            return (
              <li key={player + index}>
                <span>{player}</span>
              </li>
            );
          })}
        </div>
      </div>
    );
  };

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
      {playing.length ? <PlayingEleven /> : null}
    </div>
  );
}

export default App;

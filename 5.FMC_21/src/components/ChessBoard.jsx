import "./ChessBoard.css";

function ChessBoard() {
  function getRowsandCols(index) {
    let rows = Math.floor(index / 8);
    let cols = index % 8;
    return `${rows} ${cols}`;
  }

  function getColor(index) {
    let row = Math.floor(index / 8);
    let even = row % 2 === 0;
    let col = index % 8;
    if (even && col % 2 === 0) {
      return "blackBox";
    } else if (!even && col % 2 !== 0) {
      return "blackBox";
    }
  }
  return (
    <div>
      <div className="mainContainer">
        <div className="boxContainer">
          {Array.from({ length: 64 }, (_, index) => {
            {
              console.log(index % 2, "modulus", index);
              return (
                <div
                  className={`${"box"} 
                  ${getColor(index)}`}
                >
                  {""}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;

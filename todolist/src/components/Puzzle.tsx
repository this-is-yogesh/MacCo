import React, { useState } from "react";
import "./Puzzle.css";

type Color = "red" | "green" | "blue";

const colors: Color[] = ["red", "green", "blue"];

export const ColorMatchPuzzle: React.FC = () => {
  const [blocks, setBlocks] = useState<Color[]>(colors);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    color: Color
  ) => {
    e.dataTransfer.setData("color", color);
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColor: Color
  ) => {
    e.preventDefault();
    const draggedColor = e.dataTransfer.getData("color") as Color;

    if (draggedColor === targetColor) {
      setBlocks(prev => prev.filter(c => c !== draggedColor));
    } else {
      alert("❌ Colors don't match!");
    }
  };

  return (
    <div>
      <h2>🎨 Match the Colors!</h2>

      {/* Drop Zones */}
      <div className="drop-zone-wrapper">
        {colors.map(color => (
          <div
            key={color}
            className={`drop-zone ${color}`}
            onDrop={e => handleDrop(e, color)}
            onDragOver={handleAllowDrop}
          >
            Drop {color.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Draggable Blocks */}
      <div className="blocks-wrapper">
        {blocks.map(color => (
          <div
            key={color}
            className={`block ${color}`}
            draggable
            onDragStart={e => handleDragStart(e, color)}
          >
            {color.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

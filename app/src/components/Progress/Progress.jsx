// LevelMap.jsx
import React from "react";
import "./Progress.css";

const levels = Array.from({ length: 100 }, (_, i) => i + 1);

const Progress = () => {
  return (
    <div className="map-container">
      <div className="path">
        {levels.map((level) => (
          <div key={level} className="level-node">
            {level}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;

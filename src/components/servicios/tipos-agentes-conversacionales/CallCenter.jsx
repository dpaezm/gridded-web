import React from "react";
import "./tiposAgentes.css";

export default function CallCenter({ isActive, isPlaying, onClick }) {
  return (
    <div className="agente-option">
      <button
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ Call Center ] {isPlaying && <span className="playing-indicator"></span>}
      </button>
    </div>
  );
}

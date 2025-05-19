import React from "react";
import "./agente-texto.css";

export default function Web({ isActive, isPlaying, onClick }) {
  return (
    <div className="agente-option">
      <button
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ soporte ] {isPlaying && <span className="playing-indicator">▶</span>}
      </button>

      {isActive && (
        <div className="option-content">
          <p>FOTO AQUI</p>
        </div>
      )}
    </div>
  );
}

import React from "react";
import "./agente-texto.css";

export default function Reservas({ isActive, isPlaying, onClick }) {
  return (
    <div className="agente-option">
      <button
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ Reservas ] {isPlaying && <span className="playing-indicator">▶</span>}
      </button>

      {isActive && (
        <div className="option-content">
          <div className="audio-player-container">
            <p>FOTO AQUI</p>
          </div>
        </div>
      )}
    </div>
  );
}

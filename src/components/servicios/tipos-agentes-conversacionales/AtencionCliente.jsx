import React from "react";
import "./tiposAgentes.css";

export default function AtencionCliente({ isActive, isPlaying, onClick }) {
  return (
    <div className="agente-option">
      <button
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ Atención al cliente ] {isPlaying && <span className="playing-indicator">▶</span>}
      </button>

      {isActive && (
        <div className="option-content">
          <div className="audio-player-container">
            <audio controls className="native-audio-player" src="/audio/atencion/caso-uso-1.m4a" />
          </div>
        </div>
      )}
    </div>
  );
}

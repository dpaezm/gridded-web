import React from "react";
import "../Agente-Automatizacion.css";

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
        [ Call Center ] {isPlaying && <span className="playing-indicator">▶</span>}
      </button>

      {isActive && (
        <div className="option-content">
          <div className="audio-player-container">
            <audio controls className="native-audio-player" src="/audio/callcenter/caso-uso-2.m4a" />
          </div>
        </div>
      )}
    </div>
  );
}

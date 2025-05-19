import React from 'react';
import "../Agente-Automatizacion.css";

export default function Recepcion({ isActive, isPlaying, onClick }) {
  return (
    <div className="agente-option">
      <button 
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ Recepción ] {isPlaying && <span className="playing-indicator">▶</span>}
      </button>
      
      {isActive && (
        <div className="option-content">
          <div className="audio-player-container">
            <audio 
              controls
              className="native-audio-player"
              src="/audio/recepcion/caso-uso-3.m4a"
            />
          </div>
        </div>
      )}
    </div>
  );
}

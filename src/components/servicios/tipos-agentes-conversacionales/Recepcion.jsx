import React from "react";
import "./tiposAgentes.css";

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
        [ Recepción ] {isPlaying && <span className="playing-indicator"></span>}
      </button>
    </div>
  );
}

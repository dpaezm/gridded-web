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
        [ Atención al cliente ] {isPlaying && <span className="playing-indicator"></span>}
      </button>
    </div>
  );
}

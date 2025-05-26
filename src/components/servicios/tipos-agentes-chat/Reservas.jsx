import React from "react";
import "./agente-texto.css";

export default function Reservas({ isActive, onClick }) {
  return (
    <div className="agente-option">
      <button
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ Reservas ]
      </button>
    </div>
  );
}

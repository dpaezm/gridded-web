import React from "react";
import "./agente-texto.css";

export default function WhatsApp({ isActive, onClick }) {
  return (
    <div className="agente-option">
      <button
        className="option-header"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        [ WhatsApp ]
      </button>
    </div>
  );
}

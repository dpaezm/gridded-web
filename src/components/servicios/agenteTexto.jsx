import React, { useState, useRef } from "react";
import "./Agente-Automatizacion.css";
import WhatsApp from "./tipos-agentes-chat/WhatsApp";
import Web from "./tipos-agentes-chat/Web";
import Reservas from "./tipos-agentes-chat/Reservas";
import ChatConAgente from "./chat/ChatConAgente";

export default function agenteTexto() {
  const [activeOption, setActiveOption] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".servicio-content")) {
      setActiveOption(null);
      setShowPlayer(false);
    }
  };

  const handleOptionClick = (option) => {
    const wasActive = activeOption === option;
    setActiveOption(wasActive ? null : option);
    setShowPlayer(!wasActive);
  };

  return (
    <div className="servicio-container" onClick={handleClickOutside}>
      <div className="servicio-content agente-texto-flex">
        <h2 className="servicio-title">Agentes de texto</h2>
        <p>
          Deja que un agente se encargue de los mensajes que repites todos los días. Responde por WhatsApp, email o chat web. Gestiona reservas, dudas frecuentes y soporte sin agobios.
        </p>
        <div className="agente-texto-layout">
          <div className="servicio-options">
            <WhatsApp isActive={activeOption === "whatsapp"} onClick={() => handleOptionClick("whatsapp")} />
            <Web isActive={activeOption === "web"} onClick={() => handleOptionClick("web")} />
            <Reservas isActive={activeOption === "reservas"} onClick={() => handleOptionClick("reservas")} />
          </div>
          <div className={`chat-demo-wrapper${showPlayer ? " show" : ""}`}>
            {showPlayer && activeOption && (
              <ChatConAgente tipo={activeOption} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

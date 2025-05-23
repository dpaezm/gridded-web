import React, { useState, useRef } from "react";
import "./Agente-Automatizacion.css";
import WhatsApp from "./tipos-agentes-chat/WhatsApp";
import Web from "./tipos-agentes-chat/Web";
import Reservas from "./tipos-agentes-chat/Reservas";

export default function agenteTexto() {
  const [activeOption, setActiveOption] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".servicio-content")) {
      setActiveOption(null);
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleOptionClick = (option) => {
    const wasActive = activeOption === option;
    setActiveOption(wasActive ? null : option);

    if (audioRef.current) {
      audioRef.current.pause();
      if (!wasActive) {
        audioRef.current.src = `/audio/${option}/demo.m4a`;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Error al reproducir:", err));
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="servicio-container" onClick={handleClickOutside}>
      <h2 className="servicio-title">Agentes de texto</h2>
      <p>
        Automatiza la respuesta a mensajes por WhatsApp. Atiende consultas repetitivas, gestiona reservas y mejora tu
        atención al cliente sin esfuerzo.
      </p>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} onPause={() => setIsPlaying(false)} />

      <div className="servicio-options">
        <WhatsApp
          isActive={activeOption === "whatsapp"}
          isPlaying={activeOption === "whatsapp" && isPlaying}
          onClick={() => handleOptionClick("whatsapp")}
        />
        <Web
          isActive={activeOption === "web"}
          isPlaying={activeOption === "web" && isPlaying}
          onClick={() => handleOptionClick("web")}
        />
        <Reservas
          isActive={activeOption === "reservas"}
          isPlaying={activeOption === "reservas" && isPlaying}
          onClick={() => handleOptionClick("reservas")}
        />
      </div>
    </div>
  );
}

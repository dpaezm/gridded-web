import React, { useState, useRef } from "react";
import "./Agente-Automatizacion.css";
import AtencionCliente from "./tipos-agentes-conversacionales/AtencionCliente";
import Recepcion from "./tipos-agentes-conversacionales/Recepcion";
import CallCenter from "./tipos-agentes-conversacionales/CallCenter";

export default function AgenteConversacional() {
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
        audioRef.current.src = `/audio/${option}/${
          option === "callcenter" ? "caso-uso-2" : option === "recepcion" ? "caso-uso-3" : "caso-uso-4"
        }.m4a`;
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
      <h2 className="servicio-title">Agente de voz</h2>
      <p>
        Automatiza la atención telefónica con un agente virtual. Responde llamadas frecuentes en recepciones, clínicas,
        centros estéticos, call centers y servicios de atención al cliente.
      </p>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} onPause={() => setIsPlaying(false)} />

      <div className="servicio-options">
        <AtencionCliente
          isActive={activeOption === "atencion"}
          isPlaying={activeOption === "atencion" && isPlaying}
          onClick={() => handleOptionClick("atencion")}
        />
        <Recepcion
          isActive={activeOption === "recepcion"}
          isPlaying={activeOption === "recepcion" && isPlaying}
          onClick={() => handleOptionClick("recepcion")}
        />
        <CallCenter
          isActive={activeOption === "callcenter"}
          isPlaying={activeOption === "callcenter" && isPlaying}
          onClick={() => handleOptionClick("callcenter")}
        />
      </div>
    </div>
  );
}

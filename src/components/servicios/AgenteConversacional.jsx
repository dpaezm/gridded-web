import React, { useState, useEffect, useRef } from "react";
import "./Agente-Automatizacion.css";
import "./tipos-agentes-conversacionales/tiposAgentes.css";
import "./../../styles/variables.css";
import AtencionCliente from "./tipos-agentes-conversacionales/AtencionCliente";
import Recepcion from "./tipos-agentes-conversacionales/Recepcion";
import CallCenter from "./tipos-agentes-conversacionales/CallCenter";
import { createWaveSurfer } from "./../../utils/helpers/createWaveSurfer";

export default function AgenteConversacional() {
  const [activeOption, setActiveOption] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaveSurferReady, setIsWaveSurferReady] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      try {
        wavesurferRef.current = createWaveSurfer(waveformRef.current);
        setIsWaveSurferReady(true);

        wavesurferRef.current.on("error", (error) => console.error("WaveSurfer error:", error));
        wavesurferRef.current.on("play", () => setIsPlaying(true));
        wavesurferRef.current.on("pause", () => setIsPlaying(false));
        wavesurferRef.current.on("finish", () => setIsPlaying(false));
      } catch (error) {
        console.error("Error initializing WaveSurfer:", error);
      }
    }

    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".servicio-content")) {
      setActiveOption(null);
      wavesurferRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleOptionClick = async (option) => {
    if (!wavesurferRef.current) return;

    const wasActive = activeOption === option;
    setActiveOption(wasActive ? null : option);

    if (wasActive) {
      setShowPlayer(false);
      setIsPlaying(false);
      wavesurferRef.current.pause();
      return;
    }

    setShowPlayer(true);
    setIsLoading(true);

    try {
      const audioUrl = `/audio/${option}/${
        option === "callcenter" ? "caso-uso-2" : option === "recepcion" ? "caso-uso-3" : "caso-uso-4"
      }.m4a`;

      await wavesurferRef.current.load(audioUrl);
      setIsLoading(false);
      wavesurferRef.current.play();
    } catch (error) {
      console.error("Error loading or playing audio:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="servicio-container" onClick={handleClickOutside}>
      <h2 className="servicio-title">Agentes de voz</h2>
      <p>
        Automatiza la atención telefónica con un agente virtual. Responde llamadas frecuentes en recepciones, clínicas,
        centros estéticos, call centers, servicios de atención al cliente, o donde tu empresa lo necesite.
      </p>

      <div className="servicio-content">
        <div className="servicio-options">
          <CallCenter
            isActive={activeOption === "callcenter"}
            isPlaying={isPlaying && activeOption === "callcenter"}
            onClick={() => isWaveSurferReady && handleOptionClick("callcenter")}
          />
          <Recepcion
            isActive={activeOption === "recepcion"}
            isPlaying={isPlaying && activeOption === "recepcion"}
            onClick={() => isWaveSurferReady && handleOptionClick("recepcion")}
          />
          <AtencionCliente
            isActive={activeOption === "atencioncliente"}
            isPlaying={isPlaying && activeOption === "atencioncliente"}
            onClick={() => isWaveSurferReady && handleOptionClick("atencioncliente")}
          />
        </div>

        <div className={`audio-player-container ${showPlayer ? "show" : ""}`}>
          <div ref={waveformRef} className="waveform-container" />
          <div className="wavesurfer-controls">
            <button onClick={() => wavesurferRef.current?.playPause()} disabled={!isWaveSurferReady || isLoading}>
              {isLoading ? "⌛" : isPlaying ? "⏸" : "▶"}
            </button>
          </div>
        </div>

        {showLoadingMessage && <div className="loading-message visible">Cargando audio...</div>}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import "./Agente-Automatizacion.css";
import "./tipos-agentes-conversacionales/tiposAgentes.css";
import AtencionCliente from "./tipos-agentes-conversacionales/AtencionCliente";
import Recepcion from "./tipos-agentes-conversacionales/Recepcion";
import CallCenter from "./tipos-agentes-conversacionales/CallCenter";
import WaveSurfer from "wavesurfer.js";

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
    const initWaveSurfer = async () => {
      if (waveformRef.current && !wavesurferRef.current) {
        try {
          wavesurferRef.current = new WaveSurfer({
            container: waveformRef.current,
            waveColor: "var(--gr-grey-medium)",
            progressColor: "var(--gr-electric-blue)",
            cursorColor: "var(--gr-electric-blue)",
            barWidth: 3,
            height: 100,
          });

          // ✅ Ahora sí marcamos como listo
          setIsWaveSurferReady(true);

          wavesurferRef.current.on("error", (error) => {
            console.error("WaveSurfer error:", error);
          });

          wavesurferRef.current.on("play", () => setIsPlaying(true));
          wavesurferRef.current.on("pause", () => setIsPlaying(false));
          wavesurferRef.current.on("finish", () => setIsPlaying(false));
        } catch (error) {
          console.error("Error initializing WaveSurfer:", error);
        }
      }
    };

    initWaveSurfer();

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".servicio-content")) {
      setActiveOption(null);
      if (wavesurferRef.current) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      }
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

      await wavesurferRef.current.load(audioUrl); // 🔁 Await aquí

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
            onClick={() => {
              if (isWaveSurferReady) handleOptionClick("callcenter");
            }}
          />
          <Recepcion
            isActive={activeOption === "recepcion"}
            isPlaying={isPlaying && activeOption === "recepcion"}
            onClick={() => {
              if (isWaveSurferReady) handleOptionClick("recepcion");
            }}
          />
          <AtencionCliente
            isActive={activeOption === "atencioncliente"}
            isPlaying={isPlaying && activeOption === "atencioncliente"}
            onClick={() => {
              if (isWaveSurferReady) handleOptionClick("atencioncliente");
            }}
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

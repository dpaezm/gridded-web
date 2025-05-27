import React, { useState, useEffect, useRef } from "react";
import AtencionCliente from "./AtencionCliente";
import CallCenter from "./CallCenter";
import Recepcion from "./Recepcion";
import { createWaveSurfer } from "./../../../utils/helpers/createWaveSurfer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function LayoutAgentesConversacionales() {
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

  const handleOptionClick = (option) => {
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

    const audioUrl = `/audio/${option}/${
      option === "callcenter" ? "callcenter.m4a" : option === "recepcion" ? "recepcionhotel.wav" : "atencioncliente.mp3"
    }`;
    let played = false;
    const playWhenReady = () => {
      if (played) return;
      played = true;
      setIsLoading(false);
      wavesurferRef.current.play().catch((e) => {
        console.error("Error en wavesurfer.play():", e);
      });
      wavesurferRef.current.un("ready", playWhenReady);
    };

    wavesurferRef.current.on("ready", playWhenReady);
    wavesurferRef.current.load(audioUrl);

    // Fallback: si ya está listo tras load (por caché, etc)
    if (wavesurferRef.current.isReady) {
      playWhenReady();
    }
  };

  return (
    <div>
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

      {/* El div waveformRef siempre existe, aunque oculto si no hay audio activo */}
      {/* El contenedor visual del reproductor, incluyendo waveform y controles, se monta/desmonta con animación */}
      <div className={`audio-player-container${showPlayer ? " show" : ""}`}>
        <div ref={waveformRef} className="waveform-container" />
        <div className="wavesurfer-controls">
          <button
            className="icono"
            onClick={() => wavesurferRef.current?.playPause()}
            disabled={!isWaveSurferReady || isLoading}
          >
            <span className="icon-wrapper">
              {isLoading ? <HourglassEmptyIcon /> : isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </span>
          </button>
        </div>
      </div>

      {showLoadingMessage && <div className="loading-message visible">Cargando audio...</div>}
    </div>
  );
}

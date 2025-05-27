import React, { useState, useRef, useEffect } from "react";
import PruebaAgenteLlamada from "./tipos-agentes-conversacionales/PruebaAgenteLlamada";
import LayoutAgentesConversacionales from "./tipos-agentes-conversacionales/LayoutAgentesConversacionales";

export default function AgenteConversacional() {
  const [showCasosUso, setShowCasosUso] = useState(false);
  const [shouldRenderCasosUso, setShouldRenderCasosUso] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    if (showCasosUso) {
      setShouldRenderCasosUso(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      // Espera a que termine la animación antes de desmontar
      timeoutRef.current = setTimeout(() => setShouldRenderCasosUso(false), 500);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [showCasosUso]);

  return (
    <div className="servicio-container">
      <h2 className="servicio-title">Agentes de voz</h2>
      <div className="servicio-content">
        <p>
          Tu equipo no puede estar todo el día al teléfono. Responde llamadas frecuentes automáticamente con un agente
          de voz. Ideal para cualquier negocio, call center o servicio que reciba muchas llamadas.
        </p>
        <div className="servicio-options" id="prueba-agente-llamada">
          <PruebaAgenteLlamada onShowCasosUso={() => setShowCasosUso((v) => !v)} />
        </div>
        <div className={`servicio-options slide-down${showCasosUso ? " visible" : ""}`}>
          {shouldRenderCasosUso && <LayoutAgentesConversacionales />}
        </div>
      </div>
    </div>
  );
}

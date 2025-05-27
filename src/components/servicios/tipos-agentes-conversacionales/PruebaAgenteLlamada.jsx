import PhoneIcon from "@mui/icons-material/LocalPhone";
import "./tiposAgentes.css";
import "./../Agente-Automatizacion.css";

import { useState, useRef, useEffect } from "react";

export default function PruebaAgenteLlamada({ onShowCasosUso = () => {} }) {
  const [showDetalle, setShowDetalle] = useState(false);
  const [shouldRenderDetalle, setShouldRenderDetalle] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    if (showDetalle) {
      setShouldRenderDetalle(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => setShouldRenderDetalle(false), 500);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [showDetalle]);

  return (
    <>
      <div className="center-btn-row">
        <button className="option-header slide-btn" onClick={() => setShowDetalle((v) => !v)}>
          [ Prueba nuestro agente telefónico ]
        </button>
      </div>
      <div className={`agente-option slide-down${showDetalle ? " visible" : ""}`}>
        {shouldRenderDetalle && (
          <>
            <a className="icono" href="tel:+34881320042">
              <span className="icon-wrapper">
                <PhoneIcon />
              </span>
            </a>
            <button className="option-header-txt slide-btn" onClick={onShowCasosUso}>
              Aquí tienes más casos de uso ▼
            </button>
          </>
        )}
      </div>
    </>
  );
}

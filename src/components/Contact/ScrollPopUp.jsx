// src/components/ScrollPopup.jsx
import { useEffect, useRef, useState } from "react";
import "./ScrollPopup.css";

export default function ScrollPopup() {
  const [visible, setVisible] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    const useCasesEl = document.getElementById("usecases");

    const handleScroll = () => {
      if (!useCasesEl || hasShown.current) return;

      const rect = useCasesEl.getBoundingClientRect();
      const halfVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

      if (halfVisible) {
        setVisible(true);
        hasShown.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => setVisible(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Aquí conectas con tu backend/API
    console.log("📧 Email enviado:", email);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="popup-container">
      <div className="popup-box">
        <button className="popup-close" onClick={handleClose}>
          ×
        </button>
        <h3>¿Te interesan ideas frescas sobre IA y automatización?</h3>
        <p>Déjanos tu email y te mandamos solo lo mejor.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Tu correo electrónico" required />
          <label>
            <input type="checkbox" required /> Acepto recibir comunicaciones comerciales
          </label>
          <button type="submit">Suscribirme</button>
        </form>
      </div>
    </div>
  );
}

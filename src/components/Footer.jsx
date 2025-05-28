import { useEffect, useRef } from "react";
import "./Footer.css";
import logo from "../assets/Gridded_logo_linear_black.svg";
import imagotipo from "../assets/Gridded_imagotipo_black.svg";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const imagotipoRef = useRef(null);
  const navigate = useNavigate();

  const handleFooterNav = (target) => {
    navigate("/", { state: { scrollTo: target } });
  };

  const handleLogoClick = () => {
    navigate("/", { state: { scrollTo: "top" } });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("spin");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (imagotipoRef.current) {
      observer.observe(imagotipoRef.current);
    }

    return () => {
      if (imagotipoRef.current) {
        observer.unobserve(imagotipoRef.current);
      }
    };
  }, []);

  return (
    <section className="footer" id="footer">
      <div className="footer-logo" style={{ cursor: "pointer" }} onClick={handleLogoClick}>
        <img ref={imagotipoRef} src={imagotipo} alt="logo Gridded Agency" className="imagotipo" />
        <p id="logo2">GRIDDED.AGENCY</p>
      </div>

      <ul className="footer-2">
        <li>
          <ul className="footer-links">
            <li>
              <button className="footer-btn" onClick={() => handleFooterNav("agentes")}>
                Agentes
              </button>
            </li>
            <li>
              <button className="footer-btn" onClick={() => handleFooterNav("automatizacion")}>
                Automatización
              </button>
            </li>
            <li>
              <button className="footer-btn" onClick={() => handleFooterNav("contact")}>
                Contacto
              </button>
            </li>
          </ul>
        </li>
        <li>
          <a href="mailto:hello@gridded.agency?subject=Quiero%20automatizar%20mi%20empresa">
            [ Hello ] [ @ ] [ gridded.agency ]
          </a>
          <p>[ &copy; ] [ 2025 ]</p>
        </li>
        <li>
          <ul>
            <li>
              <a href="/aviso-legal">[ Aviso legal ]</a>
            </li>
            <li>
              <a href="/politica-de-cookies">[ Política de cookies ]</a>
            </li>
            <li>
              <a href="/politica-de-privacidad">[ Política de privacidad ]</a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}

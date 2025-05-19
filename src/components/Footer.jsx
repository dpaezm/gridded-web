import { useEffect, useRef } from 'react';
import "./Footer.css";
import logo from "../assets/Gridded_logo_linear_black.svg";
import imagotipo from "../assets/Gridded_imagotipo_black.svg";

export default function Footer() {
  const imagotipoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('spin');
        }
      });
    }, { threshold: 0.5 });

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
      <div className="footer-logo">
        <img 
          ref={imagotipoRef} 
          src={imagotipo} 
          alt="logo Gridded Agency" 
          className="imagotipo" 
        />
        <p id="logo2">GRIDDED.AGENCY</p>
      </div>

      <ul className="footer-2">
        <li>
          <ul className="footer-links">
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#automatizacion">Automatización</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="mailto:hello@gridded.agency?subject=Ayúdame%20a%20automatizar%20mi%20negocio">
            [ Hello ] [ @ ] [ gridded.agency ]
          </a>
        </li>
        <li>
          <p>[ &copy; ] [ 2025 ]</p>
        </li>
      </ul>
    </section>
  );
}

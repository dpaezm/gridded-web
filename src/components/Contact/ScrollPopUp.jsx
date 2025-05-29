import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ScrollPopUp.css";
import { sendEmailToAgente } from "../../utils/helpers/sendMailToAgente";

export default function ScrollPopUp() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popupShown");
    if (alreadyShown) return;

    const handleScroll = () => {
      const useCasesSection = document.querySelector("#useCases");
      if (!useCasesSection) return;

      const rect = useCasesSection.getBoundingClientRect();
      const scrollPosition = window.scrollY + window.innerHeight;
      const middleY = rect.top + window.scrollY + rect.height / 2;

      if (scrollPosition > middleY) {
        setShowPopup(true);
        sessionStorage.setItem("popupShown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked) return;

    try {
      await sendEmailToAgente({ email });
      toast.success("📩 ¡Gracias! Pronto recirás nuestros emails.");
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Error al enviar el email. Inténtalo de nuevo.");
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="popup-overlay visible">
      <div className="popup-box">
        <div className="popup-header">
          <button className="popup-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <h3>¿Te interesa lo que estás leyendo?</h3>
        <p>
          Si te suscribes recibirás emails de manera frecuente. <br />
        </p>
        <ul>
          <li>
            Te contaré casos de empresas que están <strong>aumentando mucho sus beneficios</strong> gracias a la IA y la
            automatización
          </li>
          <li>
            Noticias, lanzamientos y <strong>novedades del sector</strong> que considere interesantes
          </li>
          <li>
            Curiosidades y cosas en las que te puedas <strong>inspirar para tu empresa</strong>
          </li>
          <li>
            También habrá correos donde te intentaré <strong>vender mis servicios</strong>.
          </li>
        </ul>
        <p>
          Pero sobre todo, <strong>intentaré aportar valor</strong>.{" "}
        </p>
        <form onSubmit={handleSubmit} className="popup-form">
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="consent-label">
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} required />
            Acepto recibir comunicaciones comerciales de Gridded Agency y la{" "}
            <a
              href="/politica-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              política de privacidad
            </a>
            .
          </label>
          <button type="submit">Quiero recibirlo</button>
        </form>
      </div>
    </div>
  );
}

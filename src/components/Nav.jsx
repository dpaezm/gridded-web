import "./Nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const handleNav = (target) => {
    navigate("/", { state: { scrollTo: target } });
  };

  return (
    <nav className="nav">
      <ul className="nav-links">
        <li>
          <button className="nav-btn" onClick={() => handleNav("agentes")}>Agentes</button>
        </li>
        <li>
          <button className="nav-btn" onClick={() => handleNav("automatizacion")}>Automatización</button>
        </li>
        <li>
          <button className="nav-btn" onClick={() => handleNav("contact")}>Contacto</button>
        </li>
      </ul>
    </nav>
  );
}

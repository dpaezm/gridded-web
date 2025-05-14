import "./Nav.css";
import logo from "../assets/Gridded_logo_linear_white.svg";

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav-links">
        <li>
          <a href="#automatizacion">Automatización</a>
        </li>
        <li>
          <a href="#agentes">Agentes</a>
        </li>
        <li>
          <a href="#contact">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}

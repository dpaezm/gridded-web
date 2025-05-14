import "./Hero.css";
import logo from "../assets/Gridded_logo_linear_black.svg";
import logo2 from "../assets/logotest.svg";

import videoBg from "../assets/coffee-loop.mp4";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-logo">
        {/*         <img src={logo} alt="Gridded Agency" /> */}
        <p id="logo1">GRIDDED.AGENCY</p>
      </div>
      <div className="hero-content-bg">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
        </video>
      </div>
      <div className="hero-content">
        <h1>¿Sigues dedicando recursos al trabajo que puede hacerse solo?</h1>
        <p>La automatización ya no es una opción. Es tu ventaja competitiva.</p>
      </div>
    </section>
  );
}

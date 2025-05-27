import videoBg from "../assets/hero-animation.mov";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-logo">
        <p id="logo1">GRIDDED.AGENCY</p>
      </div>
      <div className="hero-content-bg">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
        </video>
      </div>
      <div className="hero-content">
        <h1>
          Automatizamos tareas repetitivas para que ganes tiempo, reduzcas costes y tu empresa crezca sin fricción.
        </h1>
        <a href="#agentes" className="hero-link">
          [ Descubre cómo ]
        </a>
      </div>
    </section>
  );
}

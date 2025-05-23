import "./Hero.css";
import videoBg from "../assets/coffee-loop.mp4";
import { useState, useEffect } from "react";

export default function Hero() {
  const [useCasesState, setUseCases] = useState([]);
  const [showUseCases, setShowUseCases] = useState(false);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  useEffect(() => {
    const jsonPath = '/src/data/use_cases.json';
    console.log('Intentando cargar JSON desde:', jsonPath);
    
    fetch(jsonPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos cargados:', data);
        setUseCases(data);
      })
      .catch(error => {
        console.error('Error cargando casos de uso:', error);
        console.log('URL intentada:', jsonPath);
      });
  }, []);

  const nextCase = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex === useCasesState.length - 1 ? 0 : prevIndex + 1));
  };

  const prevCase = () => {
    setCurrentCaseIndex((prevIndex) => (prevIndex === 0 ? useCasesState.length - 1 : prevIndex - 1));
  };

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
        {/*         <h2>¿Sigues dedicando recursos al trabajo que puede hacerse solo?</h2> */}
        <h1>
          Automatizamos tareas repetitivas <br />
          para que ganes tiempo, reduzcas <br />
          costes y escales sin fricción.
        </h1>
        <button onClick={() => setShowUseCases(!showUseCases)}> [ Casos de uso ] </button>
      </div>
      <div className={`casos-uso-container ${showUseCases ? "visible" : ""}`}>
        <div className="casos-uso-slider">
          <div className="slider-content">
            {useCasesState.length > 0 && (
              <div className="use-case-item">
                <div className="use-case-subitem">
                  <p className="case-label">[PROBLEMA]</p>
                  <p>{useCasesState[currentCaseIndex].titulo}</p>
                </div>
                <div className="use-case-subitem">
                  <p className="case-label">[SOLUCIÓN]</p>
                  <p>{useCasesState[currentCaseIndex].solucion}</p>
                </div>
                <div className="use-case-subitem">
                  <p className="case-label">[BENEFICIO]</p>
                  <p>{useCasesState[currentCaseIndex].beneficio}</p>
                </div>
              </div>
            )}
          </div>
          <div className="slider-arrows">
            <button className="slider-arrow left" onClick={prevCase} aria-label="Previous case">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="close-button" onClick={() => setShowUseCases(false)} aria-label="Close cases panel">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="slider-arrow right" onClick={nextCase} aria-label="Next case">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

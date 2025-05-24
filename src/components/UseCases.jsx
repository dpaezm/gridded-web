import useCasesData from "../data/use_cases.json";
import "./UseCases.css";
import BrandStrip from "./visuals/BrandStrip";

export default function UseCases() {
  return (
    <>
      <BrandStrip />
      <section className="use-cases" id="useCases">
        <div className="use-cases-title">
          <h3>Empresas a las que hemos ayudado</h3>
          <p className="subtitle">
            Estos son algunos ejemplos <br /> de cómo podemos ayudarte <br />a automatizar tus procesos:
          </p>
        </div>
        <ul>
          {useCasesData.map((caso) => (
            <li key={caso.id} className="use-case-item">
              <div className="use-case-subitem">
                <p className="case-label">[PROBLEMA]</p>
                <p className="case-text">{caso.problema}</p>
              </div>
              <div className="use-case-subitem">
                <p className="case-label">[SOLUCIÓN]</p>
                <p className="case-text">{caso.solucion}</p>
              </div>
              <div className="use-case-subitem">
                <p className="case-label">[BENEFICIO]</p>
                <p className="case-text">{caso.beneficio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

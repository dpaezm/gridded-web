import "./Servicios.css";
import AgenteConversacional from "./servicios/AgenteConversacional";
import AgenteTexto from "./servicios/agenteTexto";
import Automatizacion from "./servicios/Automatizacion";

export default function Servicios() {
  return (
    <section className="servicios" id="servicios">
      <h3>Así podemos ayudar</h3>
      <AgenteConversacional />
      <AgenteTexto />
      <Automatizacion />
    </section>
  );
}

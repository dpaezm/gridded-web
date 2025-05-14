import "./Benefits.css";

export default function Benefits() {
  return (
    <section className="benefits" id="benefits">
      <div className="benefits-container">
        <h2>¿Por qué automatizar con Gridded?</h2>
        <ul className="benefits-list">
          <li>
            <h3>Reduce costes operativos</h3>
            <p>
              Elimina tareas repetitivas y ahorra decenas de horas semanales. Menos errores, menos dependencia, más
              margen.
            </p>
          </li>
          <li>
            <h3>Libera a tu equipo</h3>
            <p>Haz que las personas se enfoquen en lo que realmente genera valor. Todo lo demás, lo hace un sistema.</p>
          </li>
          <li>
            <h3>Activa canales 24/7</h3>
            <p>
              Con agentes automatizados, puedes atender clientes fuera del horario comercial sin aumentar plantilla.
            </p>
          </li>
          <li>
            <h3>Implementación sin fricciones</h3>
            <p>No necesitas aprender herramientas ni formar a tu equipo. Lo hacemos todo por ti, llave en mano.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

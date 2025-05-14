import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>¿Hablamos?</h2>
        <p>
          Cuéntame brevemente en qué punto está tu empresa y qué te gustaría automatizar. Te responderé personalmente.
        </p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Nombre" required />
          <input type="email" name="email" placeholder="Correo electrónico" required />
          <textarea name="message" rows="5" placeholder="Mensaje" required></textarea>
          <button type="submit">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
}

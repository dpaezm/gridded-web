import { useState } from "react";
import "./Contact.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5678/webhook-test/gridded-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Tu mensaje se ha enviado. En breve nos pondremos en contacto contigo.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Hubo un error al enviar el mensaje");
      }
    } catch (error) {
      toast.error("Error de conexión. Inténtalo más tarde.");
    }
  };
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h3>¿Puede tu empresa aprovechar la IA de forma real y rentable?</h3>
        <p className="contact-text">
          Solo trabajamos con empresas que pueden implementar inteligencia artificial con impacto directo en costes y
          eficiencia. Cuéntanos tu situación y valoraremos si podemos ayudarte.
        </p>
        {/*         <h2 className="contact-title">¡Escríbenos!</h2> */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Describe qué te preocupa y dónde crees que tu negocio se estanca."
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          />
          <p>
            Analizamos personalmente cada solicitud.
            <br />
            Te responderemos en menos de 24h.
          </p>
          <button type="submit">Quiero empezar el proceso</button>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </div>
    </section>
  );
}

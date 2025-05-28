import Nav from "./Nav";
import Footer from "./Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "../styles/toastify-custom.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Solo ejecutar scroll si venimos de una navegación interna con scrollTo definido
    if (location.state && typeof location.state.scrollTo === "string") {
      const target = location.state.scrollTo;
      // Si el destino es 'top', solo scroll si venimos de navegación interna
      if (target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (target) {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      // Limpiar el state para evitar scrolls residuales
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

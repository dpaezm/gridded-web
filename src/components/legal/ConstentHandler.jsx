import { useEffect } from "react";

export default function ConsentHandler() {
  useEffect(() => {
    const handleConsentUpdate = () => {
      if (window.CookieYes?.consent?.analytics === true) {
        if (typeof window.gtag === "function") {
          window.gtag("config", "G-JD720QFSJ8");
          console.log("✅ Google Analytics habilitado tras consentimiento");
        }
      }
    };

    // Escuchar el evento de consentimiento de CookieYes
    window.addEventListener("cookieyes_consent_update", handleConsentUpdate);

    // Limpieza por si el componente se desmonta
    return () => {
      window.removeEventListener("cookieyes_consent_update", handleConsentUpdate);
    };
  }, []);

  return null; // Este componente no renderiza nada
}

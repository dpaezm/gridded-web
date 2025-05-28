import { useEffect } from "react";

export default function ConsentHandler() {
  useEffect(() => {
    const fireAnalytics = () => {
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-JD720QFSJ8");
        console.log("✅ Google Analytics activado tras consentimiento");
      } else {
        console.warn("⛔️ gtag aún no disponible");
      }
    };

    const handler = () => {
      setTimeout(fireAnalytics, 300); // espera ligera por si gtag carga con retraso
    };

    window.addEventListener("cookieyes_consent_update", handler);

    return () => {
      window.removeEventListener("cookieyes_consent_update", handler);
    };
  }, []);

  return null;
}

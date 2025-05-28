import { useEffect } from "react";

export default function ConsentHandler() {
  useEffect(() => {
    const fireAnalytics = () => {
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-JD720QFSJ8");
        console.log("✅ Google Analytics activado");
      } else {
        console.warn("⛔️ gtag no está definido aún");
      }
    };

    const handler = () => {
      setTimeout(fireAnalytics, 500); // espera ligera tras el consentimiento
    };

    window.addEventListener("cookieyes_consent_update", handler);

    return () => {
      window.removeEventListener("cookieyes_consent_update", handler);
    };
  }, []);

  return null;
}

import { useEffect } from "react";

export default function ConsentHandler() {
  useEffect(() => {
    const fireAnalytics = () => {
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-JD720QFSJ8");
        console.log("✅ Google Analytics activado tras clic manual");
      }
    };

    const tryAttach = () => {
      const acceptBtn = document.querySelector("#cky-btn-accept"); // o usa el ID real del botón
      if (acceptBtn) {
        acceptBtn.addEventListener("click", fireAnalytics);
      } else {
        // Sigue intentando hasta que CookieYes cargue el botón
        setTimeout(tryAttach, 500);
      }
    };

    tryAttach();

    return () => {
      const btn = document.querySelector("#cky-btn-accept");
      if (btn) btn.removeEventListener("click", fireAnalytics);
    };
  }, []);

  return null;
}

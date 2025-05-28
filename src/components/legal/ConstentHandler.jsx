import { useEffect } from "react";

export default function ConsentHandler() {
  useEffect(() => {
    const waitForGtag = (callback) => {
      if (typeof window.gtag === "function") {
        callback();
      } else {
        const interval = setInterval(() => {
          if (typeof window.gtag === "function") {
            clearInterval(interval);
            callback();
          }
        }, 100);
      }
    };

    const handleConsentUpdate = () => {
      if (window.CookieYes?.consent?.analytics === true) {
        waitForGtag(() => {
          window.gtag("config", "G-JD720QFSJ8");
          console.log("✅ Google Analytics habilitado tras consentimiento");
        });
      }
    };

    window.addEventListener("cookieyes_consent_update", handleConsentUpdate);

    return () => {
      window.removeEventListener("cookieyes_consent_update", handleConsentUpdate);
    };
  }, []);

  return null;
}

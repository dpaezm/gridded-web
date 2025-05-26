// Servicio para enviar el formulario de contacto a la API
export async function sendContactForm(formData) {
  const response = await fetch("https://n8n.gridded.agency/webhook/gridded-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response;
}

export async function sendEmailToAgente({ email }) {
  const response = await fetch("https://n8n.gridded.agency/webhook/gridded-contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Error al enviar email:", errorText);
    throw new Error("Error al enviar el email desde el popup");
  }

  return await response.json();
}

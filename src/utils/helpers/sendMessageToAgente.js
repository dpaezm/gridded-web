export async function sendMessageToAgente({ message, tipo, sessionId }) {
  const response = await fetch("https://n8n.gridded.agency/webhook/gridded-agent-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, tipo, sessionId }),
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Respuesta no OK:", errorText);
    throw new Error("Error en la respuesta del agente");
  }

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    const raw = await response.text();
    console.error("Respuesta no es JSON:", raw);
    throw new Error("La respuesta del agente no está en formato JSON");
  }
}

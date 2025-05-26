export async function sendMessageToAgente(message, tipo, sessionId = null) {
  const response = await fetch("https://n8n.gridded.agency/webhook/gridded-agent-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, tipo, sessionId }),
  });

  if (!response.ok) {
    throw new Error("Error en la respuesta del agente");
  }

  return await response.json();
}

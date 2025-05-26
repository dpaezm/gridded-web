// ChatConAgente.jsx
import "react-chat-elements/dist/main.css";
import { Input, MessageBox } from "react-chat-elements";
import "./ChatConAgente.css";
import { useEffect, useRef, useState } from "react";
import { sendMessageToAgente } from "../utils/helpers/sendMessageToAgente";
import { v4 as uuidv4 } from "uuid";

export default function ChatConAgente({ tipo }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  // Obtener o generar sessionId
  useEffect(() => {
    if (!sessionStorage.getItem("gridded_session")) {
      sessionStorage.setItem("gridded_session", uuidv4());
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const sessionId = sessionStorage.getItem("gridded_session");
      const data = await sendMessageToAgente(input, tipo, sessionId);

      const botMessage = {
        role: "bot",
        text: data.message,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Guarda el session_id devuelto, si no estaba ya
      if (!sessionId && data.session_id) {
        sessionStorage.setItem("gridded_session", data.session_id);
      }

      setMessages([...newMessages, botMessage]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: "Error al conectar con el agente.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <MessageBox
            key={idx}
            position={msg.role === "user" ? "right" : "left"}
            type="text"
            title={msg.role === "user" ? "Tú" : "Agente Gridded"}
            text={msg.text}
            /*             date={msg.timestamp ? new Date(msg.timestamp) : new Date()} */
            avatar={
              msg.role === "user"
                ? "https://ui-avatars.com/api/?name=Usuario"
                : "https://ui-avatars.com/api/?name=Gridded"
            }
          />
        ))}
        {loading && (
          <MessageBox
            position="left"
            type="text"
            title="Agente Gridded"
            text="Escribiendo..."
            avatar="https://ui-avatars.com/api/?name=Gridded"
            date={new Date()}
          />
        )}
      </div>
      <div className="chat-input">
        <Input
          placeholder="Escribe tu mensaje..."
          multiline={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.charCode === 13) sendMessage();
          }}
          rightButtons={
            <button onClick={sendMessage} className="send-button">
              ↑
            </button>
          }
        />
      </div>
    </div>
  );
}

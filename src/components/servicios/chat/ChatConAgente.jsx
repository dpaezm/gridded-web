import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/RocketLaunch";
import { sendMessageToAgente } from "../../../utils/helpers/sendMessageToAgente";
import "./ChatConAgente.css";

export default function ChatConAgente({ tipo }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem("gridded_session")) {
      sessionStorage.setItem("gridded_session", crypto.randomUUID());
    }
  }, []);

  const scrollToBottom = () => {
    const box = chatBoxRef.current;
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const sessionId = sessionStorage.getItem("gridded_session");

    const userMessage = {
      text,
      fromUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessageToAgente({ message: text, tipo, sessionId });
      console.log("Respuesta completa del agente:", res);

      const reply = {
        text: res.message,
        fromUser: false,
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error("ERROR al contactar con el agente:", err);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${err.message}`,
          fromUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iphone-chat-container">
      <div className="iphone-chat-header">Agente Gridded.Agency</div>
      <div className="iphone-chat-messages" ref={chatBoxRef}>
        <div className="bubble bubble-agent">
          <span className="bubble-text">Hola, ¿en qué puedo ayudarte?</span>
        </div>
        {messages.map((msg, i) => (
          <div key={i} className={msg.fromUser ? "bubble bubble-user" : "bubble bubble-agent"}>
            <span className="bubble-text">{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div className="bubble bubble-agent loading">
            <CircularProgress size={20} />
          </div>
        )}
      </div>
      <div className="iphone-chat-input-row">
        <input
          className="iphone-chat-input"
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="iphone-chat-send-btn" onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

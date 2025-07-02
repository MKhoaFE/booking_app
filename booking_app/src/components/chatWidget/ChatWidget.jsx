// ChatWidget.jsx
import React, { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("http://localhost:5678/webhook/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();

    const botMessage = { sender: "bot", text: data.reply || "AI không trả lời được." };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div>
      {!open && (
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          Chat
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: m.sender === "user" ? "right" : "left",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    background: m.sender === "user" ? "#007bff" : "#eee",
                    color: m.sender === "user" ? "white" : "black",
                    padding: "6px 10px",
                    borderRadius: "12px",
                    display: "inline-block",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1, padding: "10px", border: "none" }}
              placeholder="Gõ câu hỏi..."
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
              }}
            >
              Gửi
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "transparent",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput(""); // clear input immediately

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: newMessages, // 👈 send conversation
      });

      const botMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Recipe Chatbot</h2>

      {/* Chat Window */}
      <div className="w-full max-w-lg border rounded-lg p-4 h-96 overflow-y-auto bg-white shadow-md">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex mb-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-sm ${
                m.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-blue-500 text-white rounded-bl-none"
              }`}
            >
              <strong>{m.role === "user" ? "You" : "AI Assistant"}:</strong>{" "}
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex w-full max-w-lg mt-4">
        <input
          className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me a recipe..."
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

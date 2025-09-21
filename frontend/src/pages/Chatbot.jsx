import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

// Import avatars from assets
import aiAvatar from "../assets/ai_avatar.png";
import userAvatar from "../assets/user_pic.jpeg";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial welcome message from ChefBot
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I’m ChefBot, your AI-powered assistant. Ask me anything about recipes, ingredients, or cooking tips! 🍳",
        },
      ]);
    }
  }, []);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        messages: newMessages,
      });

      const botMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ChefBot 🧑‍🍳</h2>

      {/* Chat Window */}
      <div className="w-full max-w-lg border border-green-200 rounded-xl p-4 h-96 overflow-y-auto bg-green-100 shadow-lg">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex mb-3 items-end ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI Profile Image */}
            {m.role === "assistant" && (
              <img
                src={aiAvatar}
                alt="AI"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}

            {/* Message bubble */}
            <div
              className={`max-w-md px-4 py-2 rounded-2xl text-sm shadow-sm break-words prose prose-sm ${
                m.role === "user"
                  ? "bg-green-500 text-white rounded-br-none prose-invert"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="font-semibold mb-1">
                {m.role === "user" ? "You" : "ChefBot"}:
              </div>
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>

            {/* User Profile Image */}
            {m.role === "user" && (
              <img
                src={userAvatar}
                alt="You"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex w-full max-w-lg mt-4">
        <input
          className="flex-1 border border-green-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-r-xl hover:bg-green-600 transition font-semibold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

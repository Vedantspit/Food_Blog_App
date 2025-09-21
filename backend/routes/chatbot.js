const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    // 👇 now expect full message history instead of only `message`
    const messages = req.body.messages;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // or any model available on OpenRouter
        messages: [
          {
            role: "system",
            content:
              "You are a helpful recipe assistant. Only answer cooking-related queries.",
          },
          ...messages, // 👈 append entire conversation
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch chatbot response" });
  }
});

module.exports = router;

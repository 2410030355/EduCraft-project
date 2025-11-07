
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
router.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic || topic.trim() === "") {
      return res.status(400).json({ error: "Topic is required." });
    }
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that creates detailed mindmaps in clear, structured text format with subtopics and key points.",
          },
          {
            role: "user",
            content: `Create a detailed educational mindmap on the topic: "${topic}".`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const content = response?.data?.choices?.[0]?.message?.content;
    if (!content) {
      console.error("Invalid OpenAI API response:", response.data);
      return res
        .status(500)
        .json({ error: "Unexpected response format from OpenAI." });
    }
    res.json({ mindmap: content });
  } catch (error) {
    console.error("Error generating mindmap:", error.message);
    if (error.response) {
      console.error("Details:", error.response.data);
    }
    res
      .status(500)
      .json({ error: "Error generating mindmap. Please try again later." });
  }
});
module.exports = router;

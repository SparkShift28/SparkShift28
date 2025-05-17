require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or gpt-4 if your plan supports it
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ response: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ response: "Something went wrong with OpenAI API." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

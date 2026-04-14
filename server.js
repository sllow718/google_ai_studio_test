// server.js
const express = require('express');
const { GoogleGenAI } = require("@google/genai");
const botConfig = require('./config/system_prompt');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// server.js
app.post('/chat', async (req, res) => {
    try {
        // We "hand-roll" the system prompt as a user turn
        const combinedPrompt = `${botConfig.SYSTEM_INSTRUCTION}\n\nUser Question: ${req.body.message}`;

        const response = await ai.models.generateContent({
            model: botConfig.MODEL_NAME,
            contents: [{ 
                role: 'user', 
                parts: [{ text: combinedPrompt }] 
            }],
            config: {
                temperature: botConfig.GENERATION_CONFIG.temperature,
                maxOutputTokens: botConfig.GENERATION_CONFIG.maxOutputTokens
            }
        });

        const responseText = response.text || "No response received";
        res.json({ response: responseText });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Gemma is currently unavailable." });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
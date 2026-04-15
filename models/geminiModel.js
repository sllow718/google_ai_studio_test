const { GoogleGenAI } = require("@google/genai");
const botConfig = require('../config/system_prompt');
console.log("🔑 Gemini API Key Loaded:", !!process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateResponse = async (userMessage) => {
    // Combine prompt for Gemma 3 workaround
    const combinedPrompt = `${botConfig.SYSTEM_INSTRUCTION}\n\nUser: ${userMessage}`;
    
    const result = await ai.models.generateContent({
        model: botConfig.MODEL_NAME,
        contents: [{ role: 'user', parts: [{ text: combinedPrompt }] }],
        config: botConfig.GENERATION_CONFIG
    });

    return result.text;
};

module.exports = { generateResponse };
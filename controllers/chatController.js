// controllers/chatController.js
const geminiModel = require('../models/geminiModel');
const { logToSheet } = require('../utils/googleSheetsLogger');

const handleChatRequest = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const aiResponse = await geminiModel.generateResponse(message);
        await logToSheet(message, aiResponse, 'Success', sessionId);
        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Controller Error:", error.message);
        await logToSheet(message, error.message, 'Error', sessionId);
        res.status(500).json({ error: "Failed to process chat." });
    }
};

module.exports = { handleChatRequest };
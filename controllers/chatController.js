// controllers/chatController.js
const geminiModel = require('../models/geminiModel');
const { logToSheet } = require('../utils/googleSheetsLogger');

const handleChatRequest = async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        console.log(req.body)
        const aiResponse = await geminiModel.generateResponse(message);
        await logToSheet(sessionId,message, aiResponse, 'Success' );
        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Controller Error:", error.message);
        await logToSheet(sessionId, message, error.message, 'Error');
        res.status(500).json({ error: "Failed to process chat." });
    }
};

module.exports = { handleChatRequest };
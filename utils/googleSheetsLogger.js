// utils/googleSheetsLogger.js
const logToSheet = async (sessionId, userMessage, aiResponse, status = 'Success') => {
    try {
        const WEB_APP_URL = process.env.GOOGLE_SCRIPT_URL;

        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            redirect: 'follow', // CRITICAL: Tell Node to follow Google's redirect
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Use text/plain to avoid CORS pre-flight
            body: JSON.stringify({
                sessionId: sessionId, // Pass sessionId for better tracking
                message: userMessage,
                response: aiResponse,
                status: status
            })
        });

        const result = await response.text();
        console.log("📡 Apps Script Response:", result);
    } catch (error) {
        console.error('Apps Script Logging failed:', error.message);
    }
};

module.exports = { logToSheet };
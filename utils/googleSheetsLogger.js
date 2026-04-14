// utils/googleSheetsLogger.js
const { google } = require('googleapis');

const logToSheet = async (userMessage, aiResponse, status = 'Success') => {
    try {
        const auth = new google.auth.JWT(
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            null,
            process.env.GOOGLE_PRIVATE_KEY,
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });
        
        const timestamp = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A:D',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[timestamp, userMessage, aiResponse, status]],
            },
        });
    } catch (error) {
        console.error('Logging to Google Sheets failed:', error);
    }
};

module.exports = { logToSheet };
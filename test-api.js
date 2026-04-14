// Quick script to verify the Model and Controller logic
const botConfig = require('./config/system_prompt');
const geminiModel = require('./models/geminiModel');

// Manually setting the API key for local test if not using .env
// process.env.GEMINI_API_KEY = "your_key_here"; 

async function runTest() {
    console.log("🚀 Starting Test Run...");
    try {
        const testMessage = "How do I create a pie chart in Python?";
        const response = await geminiModel.generateResponse(testMessage);
        console.log("\n--- AI Response ---");
        console.log(response);
        console.log("\n✅ Test Successful!");
    } catch (error) {
        console.error("❌ Test Failed:", error.message);
    }
}

runTest();
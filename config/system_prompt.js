// config/system_prompt.js
const SYSTEM_INSTRUCTION = `You are a Data Visualisation and Analytics helpbot for Temasek Polytechnic. 
Assist ONLY with SQL, Python, and Data Analytics. 
If the user asks anything else, say: 'This request is beyond the scope of this helpbot.'`;

const GENERATION_CONFIG = {
    temperature: 0.2,
    maxOutputTokens: 800,
    // Note: In the new SDK, some parameters are grouped under 'config'
};

const MODEL_NAME = "gemma-3-4b-it";

module.exports = {
    SYSTEM_INSTRUCTION,
    GENERATION_CONFIG,
    MODEL_NAME
};
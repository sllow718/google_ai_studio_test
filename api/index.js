require('dotenv').config({ path: '../.env.local' });


// api/index.js
const express = require('express');
const cors = require('cors');
const { handleChatRequest } = require('../controllers/chatController');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/chat', handleChatRequest);

// Vercel doesn't need app.listen
module.exports = app;
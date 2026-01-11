const axios = require('axios');
const { users } = require('./authController');

exports.getNews = async (req, res) => {
    try {
        // DEBUG 1: Verify User and API Key
        console.log("--- Debugging News Request ---");
        console.log("API Key from .env:", process.env.NEWS_API_KEY ? "Found" : "MISSING");
        
        const user = users.find(u => u.id === req.user.id);
        const category = (user && user.preferences && user.preferences.length > 0) 
                         ? user.preferences[0] 
                         : 'general';
        
        console.log("Target Category:", category);

        // DEBUG 2: The Axios Call
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                apiKey: process.env.NEWS_API_KEY,
                category: category,
                language: 'en'
            }
        });

        console.log("External API Success: Received", response.data.articles.length, "articles");
        res.status(200).json(response.data.articles);

    } catch (err) {
        // DEBUG 3: Detailed Error Breakdown
        console.error("--- ERROR DETECTED ---");
        if (err.response) {
            // The request was made and the server responded with a status code
            console.error("Status:", err.response.status);
            console.error("Message from NewsAPI:", err.response.data.message);
        } else if (err.request) {
            // The request was made but no response was received
            console.error("No response received from NewsAPI. Check your internet connection.");
        } else {
            console.error("Error setting up request:", err.message);
        }
        
        res.status(500).json({ message: "Failed to fetch news", error: err.message });
    }
};
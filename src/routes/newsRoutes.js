const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authenticateToken = require('../middleware/authMiddleware');

// The news route is protected by the authenticateToken middleware
router.get('/', authenticateToken, newsController.getNews);

module.exports = router;
# Personalized News Aggregator API

A RESTful API built with Node.js and Express.js that allows users to register, log in, and fetch personalized news headlines.

## Features
- **Authentication**: Secure user registration and login using `bcryptjs` for password hashing and `JWT` for token-based security.
- **News Integration**: Real-time news fetching from external APIs (e.g., NewsAPI.org).
- **User Preferences**: Logic to filter news based on user categories.
- **Security**: Protected routes using custom middleware to verify tokens.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
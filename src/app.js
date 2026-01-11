const express = require('express');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
app.use(express.json());

app.use('/users', authRoutes);
app.use('/news', newsRoutes);

module.exports = app;
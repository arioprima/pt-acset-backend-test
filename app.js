const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection URL
const mongoUrl = MONGO_URI;

// Establish MongoDB connection with better error handling
mongoose.connect(mongoUrl).then(() => console.log('Database connected!')).catch(err => console.error('Database connection error:', err));

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log('Database disconnected!');
});

module.exports = db;

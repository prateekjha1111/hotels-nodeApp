const mongoose = require('mongoose');

// MongoDB connection URL
const mongoUrl = 'mongodb://127.0.0.1:27017/hotels';

// Establish MongoDB connection with better error handling
mongoose.connect(mongoUrl).then(() => console.log('Database connected!')).catch(err => console.error('Database connection error:', err));

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log('Database disconnected!');
});

module.exports = db;

const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', function (req, res) {
  res.send('Hello, welcome to home!')
});

// person routes
app.use('/person', personRoutes);

// menu routes
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
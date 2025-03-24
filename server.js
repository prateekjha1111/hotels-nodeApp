const express = require('express')
const app = express()
const db = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use(express.json()); 

app.get('/', function (req, res) {
  res.send('Hello, welcome to home!')
});

// person routes
app.use('/person', personRoutes);

// menu routes
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
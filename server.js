const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/db');


const app = express();

//imports routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concerts);
app.use('/', seats);

//home
app.get('/', (req, res) => {
    res.send('<h1>my server</h1>');
});

//404
app.use((req, res) => {
    res.status(404);
    res.json({messange: 'Not found...'});
  });

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
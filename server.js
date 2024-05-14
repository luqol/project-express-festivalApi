const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');


const app = express();

//init server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);

//imports routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

//middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concerts);
app.use('/', seats);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
  
//home
app.get('/', (req, res) => {
    res.send('<h1>my server</h1>');
});

//404
app.use((req, res) => {
    res.status(404);
    res.json({messange: 'Not found...'});
  });



io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);


  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left'); 
  });
});

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

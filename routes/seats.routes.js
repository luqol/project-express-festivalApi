const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const router = express.Router();
const db = require('../db/db');
const { Socket } = require('socket.io');

//getAll

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

//getSeatsById

router.route('/seats/:id').get((req,res) => {
    if (req.params.id === 'random'){
        res.json(db.seats[Math.floor(Math.random()*db.seats.length)]);
    } else {
        res.json(db.seats.filter( seat => seat.id === req.params.id));
    }
});

//addSeats

router.route('/seats').post((req, res) => {
    const {day, seat, client, email } = req.body;

    if ( day && seat && client && email){

        db.seats.map( seatSingle => {
            if(seatSingle.day === parseInt(day) && seatSingle.seat === parseInt(seat)) {
                res.json({ message: "The slot is already taken..." });
            }
        });
        db.seats.push({id: uuidv4(), day: parseInt(day), seat: parseInt(seat), client: client, email: email});
        req.io.emit('seatsUpdated', db.seats);
        res.json({messange: 'ok'});
    } else {
        res.json({messange: 'Some data is missing'})
    }
    
});

//editById
router.route('/seats/:id').put((req, res) => {
    const {day, seat, client, email} = req.body;
    day = parseInt(day);
    seat = parseInt(seat);
    db.seats = db.seats.map( seatSingle => (seatSingle.id === req.params.id ? {...seatSingle, day: parseInt(day), seat: parseInt(seat), client: client, email: email} : seatSingle));
    res.json({messange: 'ok'});
});
//delete

router.route('/seats/:id').delete((req,res) => {
    db.seats = db.seats.filter( seat => seat.id != req.params.id );
    res.json({messange: 'ok'});
});

module.exports = router;
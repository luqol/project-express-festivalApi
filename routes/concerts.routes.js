const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const router = express.Router();
const db = require('../db/db');

//getAll

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

//getConcertById

router.route('/concerts/:id').get((req,res) => {
    if (req.params.id === 'random'){
        res.json(db.concerts[Math.floor(Math.random()*db.concerts.length)]);
    } else {
        res.json(db.concerts.filter( concert => concert.id === req.params.id));
    }
});

//addConcert

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day, image } = req.body;
    if (performer && genre && price && day && image ){
        db.concerts.push({id: uuidv4(), performer: performer, genre:genre, price: price, day: day, image: image});
        res.json({messange: 'ok'});
    } else {
        res.json({messange: 'Some data is missing'})
    }
});

//editById
router.route('/concerts/:id').put((req, res) => {
    const {performer, genre, price, day, image } = req.body;
    db.concerts = db.concerts.map( concert => (concert.id === req.params.id ? {...concert, performer: performer, genre:genre, price: price, day: day, image: image} : concert))
    res.json({messange: 'ok'});
});

//delete

router.route('/concerts/:id').delete((req,res) => {
    db.concerts = db.concerts.filter( concert => concert.id != req.params.id );
    res.json({messange: 'ok'});
});

module.exports = router;
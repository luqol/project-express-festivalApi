const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const router = express.Router();
const db = require('../db/db');

//getAll

router.route('/testimonials').get((req, res) =>{
    res.json(db.testimonials);
});

//getById

router.route('/testimonials/:id').get((req, res) => {
    if (req.params.id === 'random'){
        res.json(db.testimonials[Math.floor(Math.random()*db.testimonials.length)]);
    } else {
        res.json(db.testimonials.filter( testim => testim.id === req.params.id));
    }
});

//add

router.route('/testimonials').post((req, res) => {
    const {author, text} = req.body; 
    db.testimonials.push({id: uuidv4(), author: author, text: text});
    res.json({messange: 'ok'});
});

//editById

router.route('/testimonials/:id').put((req, res) => {
    const {author, text} = req.body; 
    db.testimonials = db.testimonials.map( testim => (testim.id === req.params.id ? {...testim, author: author, text: text} : testim));
    res.json({messange: 'ok'});
});

//delete
router.route('/testimonials/:id').delete((req,res) => {
    db.testimonials = db.testimonials.filter( testim => testim.id !== req.params.id );
    res.json({messange: 'ok'});
});

module.exports = router;
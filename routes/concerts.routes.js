const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

//getAll

router.get('/concerts',ConcertController.getAll );

//getConcertById

router.get('/concerts/:id', ConcertController.getById);

//addConcert

router.post('/concerts', ConcertController.add);

//editById
router.put('/concerts/:id', ConcertController.edit);

//delete

router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;
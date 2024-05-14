const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.controller');

//getAll

router.get('/seats', SeatController.getAll );

//getSeatsById

router.get('/seats/:id', SeatController.getById);

//addSeats

router.post('/seats', SeatController.add);

//editById
router.put('/seats/:id', SeatController.edit);

//delete

router.delete('/seats/:id', SeatController.delete);

module.exports = router;
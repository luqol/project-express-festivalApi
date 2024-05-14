const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonial.controller');

//getAll

router.get('/testimonials', TestimonialsController.getAll);

//getById

router.get('/testimonials/:id', TestimonialsController.getById);

//add

router.post('/testimonials', TestimonialsController.add);

//editById

router.put('/testimonials/:id', TestimonialsController.edit);

//delete
router.delete('/testimonials/:id', TestimonialsController.delete);

module.exports = router;
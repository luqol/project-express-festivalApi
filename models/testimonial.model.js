const  mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: {type: String, requred: true},
    text: {type: String, required: true},

});

module.exports = mongoose.model('Testimonial', testimonialSchema);
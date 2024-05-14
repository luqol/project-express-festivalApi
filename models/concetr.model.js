const  mongoose = require('mongoose');

const concertShema = new mongoose.Schema({
    performer: {type: String, requred: true},
    genre: {type: String, required: true},
    price: {type: Number, require: true},
    day: {type: Number, require: true},
    image: {type: String, require: true}
});

module.exports = mongoose.model('Concert', concertShema);
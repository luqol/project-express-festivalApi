const Seat = require('../models/seat.model');
const { Socket } = require('socket.io');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json( await Seat.find());
    }
    catch(err) {
        res.status(500).json({ messange: 'Not found'});
    }
};

exports.getById = async (req,res) => {
    try {
      const se = await Seat.findById(req.params.id);
      if(!se) res.status(404).json({ message: 'Not found' });
      else res.json(se);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.add = async (req, res) => {
    try {
        const {day, seat, client, email } = req.body;
        const cEmail = sanitize(email);
        const cClient = sanitize(client);

        if ( day && seat && cClient && cEmail){
            const newSeat = new Seat( {day: day, seat: seat, client: cClient, email: cEmail});
            await newSeat.save();
            req.io.emit('seatsUpdated', await Seat.find());
            res.json({ message: 'OK' });
        } else {
            res.json({messange: 'Some data is missing'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.edit = async (req, res) => {
    try {
        const {day, seat, client, email} = req.body;
        const id = sanitize(req.params.id);
        const se = await Seat.findById(id);
        if (se) {
            await Seat.updateOne( { _id: req.params.id}, { $set: { day, seat, client, email }});
            res.json({ message: 'ok'});
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.delete = async (req,res) => {
    try {
        const se = await Seat.findById(req.params.id);
        if(se){
            await Seat.deleteOne( {_id: req.params.id});
            // await se.remove();
            res.json( { message: 'ok'});
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
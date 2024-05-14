const Concert = require('../models/concetr.model');

exports.getAll = async (req, res) => {
    try {
        res.json( await Concert.find());
    }
    catch(err) {
        res.status(500).json({ messange: 'Not found'});
    }
};

exports.getById = async (req,res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.add = async (req, res) => {
    try {
        const {performer, genre, price, day, image } = req.body;
        const newConcer = new Concert( {performer, genre, price, day, image });
        await newConcer.save();
        res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.edit = async (req, res) => {
    try {
        const {performer, genre, price, day, image } = req.body;
        const con = await Concert.findById(req.params.id);
        if (con) {
            await Concert.updateOne( { _id: req.params.id}, { $set: {performer, genre, price, day, image }});
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
        const con = await Concert.findById(req.params.id);
        if(con){
            await Concert.deleteOne( {_id: req.params.id});
            // await con.remove();
            res.json( { message: 'ok'});
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
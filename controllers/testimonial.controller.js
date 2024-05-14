const Testimonials = require('../models/testimonial.model');

exports.getAll =async (req, res) =>{
    try {
        res.json( await Testimonials.find());
    }
    catch(err) {
        res.status(500).json({ messange: 'Not found'});
    }
};

exports.getById = async (req, res) => {
    try {
        const test = await Testimonials.findById(req.params.id);
        if(!test) res.status(404).json({ message: 'Not found' });
        else res.json(test);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.add = async (req, res) => {
    try {
        const {author, text} = req.body; 
        const newTest = new Testimonials( { author, text})
        await newTest.save();
        res.json({ message: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.edit = async (req, res) => {
    try {
        const {author, text} = req.body; 
        const test = await Testimonials.findById(req.params.id);
        if (test) {
            await Testimonials.updateOne( { _id: req.params.id}, { $set: {author, text }});
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
        const test = await Testimonials.findById(req.params.id);
        if(test){
            await Testimonials.deleteOne( {_id: req.params.id});
            // await con.remove();
            res.json( { message: 'ok'});
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
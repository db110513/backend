const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');


router.post('/', async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).send(professor);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const professors = await Professor.find();
    res.send(professors);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});



router.put('/:dni', async (req, res) => {
    try {
        const professor = await Alumne.findOneAndUpdate({ dni: req.params.dni }, req.body, { new: true });
        if (!professor) {
        return res.status(404).send({ message: 'Professor no trobat' });
        }
        res.send(professor);
    } 
    catch (error) {
        res.status(400).send(error);
    }
});
  
router.delete('/:dni', async (req, res) => {
    try {
        const professor = await Alumne.findOneAndDelete({ dni: req.params.dni });
        if (!professor) {
        return res.status(404).send({ message: 'Professor no trobat' });
        }
        res.send({ message: 'Professor eliminat' });
    } 
    catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

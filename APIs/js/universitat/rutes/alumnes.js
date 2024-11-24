const express = require('express');
const router = express.Router();
const Alumne = require('../models/Alumne');

router.post('/', async (req, res) => {
  try {
    const alumne = new Alumne(req.body);
    await alumne.save();
    res.status(201).send(alumne);
  }
  catch (error) {
    res.status(400).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const alumnes = await Alumne.find();
    res.send(alumnes);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});


router.put('/:dni', async (req, res) => {
    try {
        const alumne = await Alumne.findOneAndUpdate({ dni: req.params.dni }, req.body, { new: true });
        if (!alumne) {
        return res.status(404).send({ message: 'Alumne no trobat' });
        }
        res.send(alumne);
    } 
    catch (error) {
        res.status(400).send(error);
    }
});
  
router.delete('/:dni', async (req, res) => {
    try {
        const alumne = await Alumne.findOneAndDelete({ dni: req.params.dni });
        if (!alumne) {
        return res.status(404).send({ message: 'Alumne no trobat' });
        }
        res.send({ message: 'Alumne eliminat' });
    } 
    catch (error) {
        res.status(500).send(error);
    }
});
  

module.exports = router;

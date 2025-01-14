const express = require('express');
const router = express.Router();
const Recepta = require('../models/Recepta');

router.get('/receptes', async (req, res) => {
  try {
    const receptes = await Recepta.find().populate('autor', 'usuari');
    res.json(receptes);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/creaRecepta', async (req, res) => {
  const recepta = new Recepta({
    titol: req.body.titol,
    ingredients: req.body.ingredients,
    passos: req.body.passos,
    tempsPreparacio: req.body.tempsPreparacio,
    dificultat: req.body.dificultat,
    autor: req.body.autor
  });

  try {
    const novaRecepta = await recepta.save();
    res.status(201).json(novaRecepta);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/actualitzaRecepta/:id', async (req, res) => {
  try {
    const recepta = await Recepta.findById(req.params.id);
    Object.assign(recepta, req.body);
    const receptaActualitzada = await recepta.save();
    res.json(receptaActualitzada);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/eliminaRecepta/:id', async (req, res) => {
  try {
    await Recepta.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recepta eliminada correctament' });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

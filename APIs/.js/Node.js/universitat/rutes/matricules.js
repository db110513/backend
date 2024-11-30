const express = require('express');
const router = express.Router();
const Matricula = require('../models/Matricula');


router.post('/crea', async (req, res) => {
  try {
    const matricula = new Matricula(req.body);
    await matricula.save();
    res.status(201).send(matricula);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});


router.get('/obteTotes', async (req, res) => {
  try {
    const matricules = await Matricula.find().populate('alumne assignatura');
    res.send(matricules);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});


router.put('/actualitza/:id', async (req, res) => {
    try {
        const matricula = await Matricula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(matricula);
    } 
    catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/elimina/:id', async (req, res) => {
  try {
    await Matricula.findByIdAndDelete(req.params.id);
    res.send({ message: 'Matrícula eliminada' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

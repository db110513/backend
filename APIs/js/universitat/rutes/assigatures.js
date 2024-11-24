const express = require('express');
const router = express.Router();
const Assignatura = require('../models/Assigatura');


router.post('/crea', async (req, res) => {
  try {
    const assignatura = new Assignatura(req.body);
    await assignatura.save();
    res.status(201).send(assignatura);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});


router.get('/obteTotes', async (req, res) => {
  try {
    const assignatures = await Assignatura.find().populate('professor');
    res.send(assignatures);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});


router.put('/actualitza/:id', async (req, res) => {
  try {
    const assignatura = await Assignatura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(assignatura);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/elimina/:id', async (req, res) => {
  try {
    await Assignatura.findByIdAndDelete(req.params.id);
    res.send({ message: 'Assignatura eliminada' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

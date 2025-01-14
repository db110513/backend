const express = require('express');
const router = express.Router();
const Usuari = require('../models/Usuari');

router.get('/usuaris', async (req, res) => {
  try {
    const usuaris = await Usuari.find();
    res.json(usuaris);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/creaUsuari', async (req, res) => {
  const usuari = new Usuari({
    usuari: req.body.usuari,
    passwd: req.body.passwd
  });

  try {
    const nouUsuari = await usuari.save();
    res.status(201).json(nouUsuari);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/actualitzaUsuari/:id', async (req, res) => {
  try {
    const usuari = await Usuari.findById(req.params.id);
    if (req.body.usuari) {
      usuari.usuari = req.body.usuari;
    }
    if (req.body.passwd) {
      usuari.passwd = req.body.passwd;
    }
    const usuariActualitzat = await usuari.save();
    res.json(usuariActualitzat);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('eliminaUsuari/:id', async (req, res) => {
  try {
    await Usuari.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuari eliminat correctament' });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

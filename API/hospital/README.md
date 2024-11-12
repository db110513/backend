# Hospital



```
npm init -y
npm i express mongoose body-parser jsonwebtoken bcrypt nodemon
```

package.json
```
"scripts": {
  "dev": "nodemon index"
}
```

models/Pacient.js
```
const mongoose = require('mongoose');

const pacientSchema = new mongoose.Schema({
  nom: String,
  cognoms: String,
  edat: Number,
  sexe: String,
  diagnosi: String,
});

module.exports = mongoose.model('Pacient', pacientSchema);
```

models/Metge.js
```
const mongoose = require('mongoose');

const metgeSchema = new mongoose.Schema({
  nom: String,
  especialitat: String,
  numero_licencia: String,
});

module.exports = mongoose.model('Metge', metgeSchema);

```

models/Cita.js
```
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  pacient: { type: mongoose.Schema.Types.ObjectId, ref: 'Pacient' },
  metge: { type: mongoose.Schema.Types.ObjectId, ref: 'Metge' },
  data: Date,
  motiu: String,
});

module.exports = mongoose.model('Cita', citaSchema);
```

rutes/rutesHospital.js

```
const express = require('express');
const router = express.Router();

const Pacient = require('../models/Pacient');
const Metge = require('../models/Metge');
const Cita = require('../models/Cita');

/// RUTES PER PACIENTS ///
router.post('/nouPacient', async (req, res) => {
  try {
    const pacientExist = await Pacient.findOne({ dni: req.body.dni });
    if (pacientExist) return res.status(400).send({ error: 'El pacient ja existeix amb aquest DNI.' });
    
    const pacient = new Pacient(req.body);
    await pacient.save();
    res.status(201).send(pacient);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.get('/pacient/:dni', async (req, res) => {
  try {
    const pacient = await Pacient.findOne({ dni: req.params.dni });
    if (!pacient) return res.status(404).send('Pacient no trobat');
    res.send(pacient);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.put('/pacient/:dni', async (req, res) => {
  try {
    const pacient = await Pacient.findOneAndUpdate({ dni: req.params.dni }, req.body, { new: true });
    if (!pacient) return res.status(404).send('Pacient no trobat');
    res.send(pacient);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/pacient/:dni', async (req, res) => {
  try {
    const pacient = await Pacient.findOneAndDelete({ dni: req.params.dni });
    if (!pacient) return res.status(404).send('Pacient no trobat');
    res.send({ message: 'Pacient esborrat' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

/// RUTES PER METGES ///
router.post('/nouMetge', async (req, res) => {
  try {
    const metgeExist = await Metge.findOne({ dni: req.body.dni });
    if (metgeExist) return res.status(400).send({ error: 'El metge ja existeix amb aquest DNI.' });

    const metge = new Metge(req.body);
    await metge.save();
    res.status(201).send(metge);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.get('/metge/:dni', async (req, res) => {
  try {
    const metge = await Metge.findOne({ dni: req.params.dni });
    if (!metge) return res.status(404).send('Metge no trobat');
    res.send(metge);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.put('/metge/:dni', async (req, res) => {
  try {
    const metge = await Metge.findOneAndUpdate({ dni: req.params.dni }, req.body, { new: true });
    if (!metge) return res.status(404).send('Metge no trobat');
    res.send(metge);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/metge/:dni', async (req, res) => {
  try {
    const metge = await Metge.findOneAndDelete({ dni: req.params.dni });
    if (!metge) return res.status(404).send('Metge no trobat');
    res.send({ message: 'Metge esborrat' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

/// RUTES PER CITES ///
router.post('/novaCita', async (req, res) => {
  try {
    const cita = new Cita({
      pacient: req.body.pacient,
      metge: req.body.metge,
      data: req.body.data,
      motiu: req.body.motiu,
    });
    await cita.save();
    res.status(201).send(cita);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.get('/cites', async (req, res) => {
  try {
    const cites = await Cita.find().populate('pacient').populate('metge');
    res.send(cites);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.get('/cita/:id', async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id).populate('pacient').populate('metge');
    if (!cita) return res.status(404).send('Cita no trobada');
    res.send(cita);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.put('/cita/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('pacient').populate('metge');
    if (!cita) return res.status(404).send('Cita no trobada');
    res.send(cita);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/cita/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) return res.status(404).send('Cita no trobada');
    res.send({ message: 'Cita esborrada' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
```

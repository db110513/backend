# Hospital

Codi compilat:

https://www.loom.com/share/008ea00832834d92880c48cb28525b78

```
npm init -y
npm i express mongoose body-parser jsonwebtoken bcrypt nodemon
```
new-item index.js

mkdir models

mkdir rutes

new-item models/

new-item models/


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
  dni: { type: String, unique: true, required: true },
  nom: { type: String, required: true },
  sexe: { type: String, required: true },
  diagnosi: { type: String, required: true },
});

module.exports = mongoose.model('Pacient', pacientSchema);

```

models/Metge.js
```
const mongoose = require('mongoose');

const metgeSchema = new mongoose.Schema({
  dni: {type: String, unique: true },
  cognoms: { type: String, required: true },
  especialitat: { type: String, required: true }
});

module.exports = mongoose.model('Metge', metgeSchema);


```

models/Cita.js
```
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  dniPacient: { type: String, required: true },
  dniMetge: { type: String, required: true },
  motiu: { type: String, required: true }
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

router.get('/pacients', async (req, res) => {
  try {
    const pacients = await Pacient.find();
    console.log(pacients);
    res.send(pacients);
  } 
  catch (error) {
    res.status(500).send(error);
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

router.get('/metges', async (req, res) => {
  try {
    const metges = await Metge.find();
    res.send(metges);
  } 
  catch (error) {
    res.status(500).send(error);
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
    const { data, dniPacient, dniMetge, motiu } = req.body;

    if (!dniPacient || !dniMetge || !data || !motiu) {
      return res.status(400).send("Tots els camps són requerits.");
    }

    const pacient = await Pacient.findOne({ dni: dniPacient });
    const metge = await Metge.findOne({ dni: dniMetge });

    if (!pacient)  return res.status(404).send("DNI del pacient erroni.");
    if (!metge)   return res.status(404).send("DNI del metge erroni.");

    const novaCita = new Cita({
      data,
      dniPacient,
      dniMetge,
      motiu,
    });

    await novaCita.save();
    res.status(201).send(novaCita);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al crear la cita', error });
  }
});


router.get('/cites', async (req, res) => {
  try {
    const cites = await Cita.find()
      .populate('dniPacient', 'dni')  
      .populate('dniMetge', 'dni');  
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

router.put('/cita/:dni', async (req, res) => {
  try {
    const { dni } = req.params;  
    const { data, dniPacient, dniMetge, motiu } = req.body; 

    const cita = await Cita.findOne({ dniPacient: dni });
    if (!cita) return res.status(404).send("Cita no trobada.");
    
    cita.data = data || cita.data;
    cita.dniPacient = dniPacient || cita.dniPacient;
    cita.dniMetge = dniMetge || cita.dniMetge;
    cita.motiu = motiu || cita.motiu;

    await cita.save();
    res.status(200).send(cita);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error en actualitzar la cita', error });
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

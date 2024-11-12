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
```const express = require('express');
const router = express.Router();

const Pacient = require('../models/Pacient');
const Metge = require('../models/Metge');
const Cita = require('../models/Cita');

/// RUTES PER PACIENTS ///
router.post('/pacient', async (req, res) => {
  try {
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
    res.send(pacients);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.get('/pacient/:id', async (req, res) => {
  try {
    const pacient = await Pacient.findById(req.params.id);
    if (!pacient) return res.status(404).send('Pacient no trobat');
    res.send(pacient);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.put('/pacient/:id', async (req, res) => {
  try {
    const pacient = await Pacient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pacient) return res.status(404).send('Pacient no trobat');
    res.send(pacient);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/pacient/:id', async (req, res) => {
  try {
    const pacient = await Pacient.findByIdAndDelete(req.params.id);
    if (!pacient) return res.status(404).send('Pacient no trobat');
    res.send({ message: 'Pacient eliminat correctament' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

/// RUTES PER METGES ///
router.post('/metge', async (req, res) => {
  try {
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

router.get('/metge/:id', async (req, res) => {
  try {
    const metge = await Metge.findById(req.params.id);
    if (!metge) return res.status(404).send('Metge no trobat');
    res.send(metge);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

router.put('/metge/:id', async (req, res) => {
  try {
    const metge = await Metge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!metge) return res.status(404).send('Metge no trobat');
    res.send(metge);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/metge/:id', async (req, res) => {
  try {
    const metge = await Metge.findByIdAndDelete(req.params.id);
    if (!metge) return res.status(404).send('Metge no trobat');
    res.send({ message: 'Metge eliminat correctament' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

/// RUTES PER CITES ///
router.post('/cita', async (req, res) => {
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
    res.send({ message: 'Cita eliminada correctament' });
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

```


index.js
```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const rutesHospital = require('./rutes/rutesHospital');
app.use('/api', rutesHospital);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

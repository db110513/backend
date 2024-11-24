const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/universitat')
.then(() => console.log('Connectat a MongoDB!'))
.catch((error) => console.log('Error de connexió a MongoDB: ', error));

const alumnesRoutes = require('./rutes/alumnes');
const assigaturesRoutes = require('./rutes/assigatures');
const professorsRoutes = require('./rutes/professors');
const matriculesRoutes = require('./rutes/matricules');

app.use(bodyParser.json());

app.use('/alumnes', alumnesRoutes);
app.use('/assigatures', assigaturesRoutes);
app.use('/professors', professorsRoutes);
app.use('/matricules', matriculesRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en marxa en http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hospital')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const rutesHospital = require('./rutes/rutesHospital');
app.use('/', rutesHospital);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});

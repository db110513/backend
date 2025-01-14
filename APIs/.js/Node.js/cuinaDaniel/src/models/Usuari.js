const mongoose = require('mongoose');

const usuariSchema = new mongoose.Schema({
  usuari: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwd: {
    type: String,
    required: true
  }
});

const Usuari = mongoose.model('Usuari', usuariSchema);

module.exports = Usuari;

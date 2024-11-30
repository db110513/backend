const mongoose = require('mongoose');

const alumneSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  edat: { type: Number, required: true },
});

module.exports = mongoose.model('Alumne', alumneSchema);

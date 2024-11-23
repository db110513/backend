const mongoose = require('mongoose');

const pacientSchema = new mongoose.Schema({
  dni: { type: String, unique: true, required: true },
  nom: { type: String, required: true },
  sexe: { type: String, required: true },
  diagnosi: { type: String, required: true },
});

module.exports = mongoose.model('Pacient', pacientSchema);

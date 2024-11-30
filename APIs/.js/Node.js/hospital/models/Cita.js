const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  dniPacient: { type: String, required: true },
  dniMetge: { type: String, required: true },
  motiu: { type: String, required: true }
});

module.exports = mongoose.model('Cita', citaSchema);

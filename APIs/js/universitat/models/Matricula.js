const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
  alumne: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumne', required: true },
  assignatura: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignatura', required: true },
  data: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Matricula', matriculaSchema);

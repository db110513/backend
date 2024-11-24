const mongoose = require('mongoose');

const assignaturaSchema = new mongoose.Schema({
  codi: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
});

module.exports = mongoose.model('Assignatura', assignaturaSchema);

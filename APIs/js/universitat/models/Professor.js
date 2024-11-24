const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  cognoms: { type: String, required: true },
  departament: { type: String, required: true },
});

module.exports = mongoose.model('Professor', professorSchema);

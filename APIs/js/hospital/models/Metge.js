const mongoose = require('mongoose');

const metgeSchema = new mongoose.Schema({
  dni: {type: String, unique: true },
  cognoms: { type: String, required: true },
  especialitat: { type: String, required: true }
});

module.exports = mongoose.model('Metge', metgeSchema);

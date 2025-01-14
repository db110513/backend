const mongoose = require('mongoose');

const receptaSchema = new mongoose.Schema({
  titol: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    nom: String,
    quantitat: String,
    unitat: String
  }],
  passos: [String],
  tempsPreparacio: Number,
  dificultat: {
    type: String,
    enum: ['Fàcil', 'Mitjana', 'Difícil'],
    default: 'Mitjana'
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuari',
    required: true
  }
}, {
  timestamps: true
});

const Recepta = mongoose.model('Recepta', receptaSchema);

module.exports = Recepta;

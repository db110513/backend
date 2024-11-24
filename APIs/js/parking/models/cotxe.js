const mongoose = require("mongoose");

const cotxeSchema = new mongoose.Schema({
  matricula: { type: String, required: true, unique: true },
  marca: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
});

const Cotxe = mongoose.model("Cotxe", cotxeSchema);

module.exports = Cotxe;

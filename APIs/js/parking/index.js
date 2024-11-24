const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const rutesParking = require("./rutes/rutesParking"); 

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/parking")
  .then(() => console.log("Connexió a MongoDB correcta!"))
  .catch((error) => console.error("Error connectant a MongoDB:", error));

  app.use("/api/parking", rutesParking);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escoltant a http://localhost:${PORT}`));

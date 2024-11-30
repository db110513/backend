const express = require("express");
const Cotxe = require("../models/cotxe.js"); 

const router = express.Router();

router.post("/crea", async (req, res) => {
    try {
      const { matricula } = req.body;
      const cotxeExisteix = await Cotxe.findOne({ matricula });

      if (cotxeExisteix) {
        return res.status(400).send({ error: "El cotxe ja existeix." });
      }

      const cotxe = new Cotxe(req.body);
      await cotxe.save();
      res.status(201).send(cotxe);

    } 
    catch (error) {
      res.status(400).send(error);
    }
  });
  
router.get("/parking", async (req, res) => {
  try {
    const cotxes = await Cotxe.find();
    res.status(200).send(cotxes);

    if (cotxes.length === 0) {
        return res.status(200).send({ message: "No hi ha cotxes al pàrquing." });
      }
      
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:matricula", async (req, res) => {
  try {
    const cotxe = await Cotxe.findOne({ matricula: req.params.matricula });
    if (!cotxe) return res.status(404).send({ error: "Cotxe no trobat" });
    res.status(200).send(cotxe);
  } 
  catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:matricula", async (req, res) => {
  try {
    const cotxe = await Cotxe.findOneAndUpdate(
      { matricula: req.params.matricula },
      req.body,
      { new: true, runValidators: true }
    );
    if (!cotxe) return res.status(404).send({ error: "Cotxe no trobat" });
    res.status(200).send(cotxe);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:matricula", async (req, res) => {
  try {
    const cotxe = await Cotxe.findOneAndDelete({ matricula: req.params.matricula });
    if (!cotxe) return res.status(404).send({ error: "Cotxe no trobat" });
    res.status(200).send({ message: "Cotxe eliminat correctament" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

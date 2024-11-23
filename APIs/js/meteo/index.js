require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 3000;

app.get('/api/temps/', async (req, res) => {
  const ciutat = req.query.ciutat;
  if (!ciutat) {
    return res.status(400).json({ error: 'Especifica una ciutat' });
  }

  try {
    const resposta = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: process.env.API_KEY,
          q: ciutat,
          lang: 'ca', 
        },
      }
    );
    res.json(resposta.data);
  } 
  catch (error) {
    res.status(500).json({ error: 'No es poden obtenir les dades del temps' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor actiu al port ${PORT}`);
});

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imatges'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

app.post('/pujaImatge', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No s\'ha pujat cap imatge');
  }
  res.status(200).send({ imageUrl: `/imatges/${req.file.filename}` });
});

app.use('/imatges', express.static('imatges'));

app.get('/', (req, res) => {
  res.send('API en funcionament!');
});

app.listen(port, () => {
  console.log(`Servidor actiu a http://localhost:${port}`);
});

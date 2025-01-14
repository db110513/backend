const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT, () => console.log(`Servidor funcionant al port ${PORT}`));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Benvingut a CuinaDaniel!');
});

app.listen(PORT, () => {
  console.log(`Servidor actiu a http://localhost:${PORT}`);
});

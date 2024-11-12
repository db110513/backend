npm init -y
npm i express mongoose body-parser jsonwebtoken bcrypt nodemon

package.json
"scripts": {
  "dev": "nodemon index"
}

index.js
```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

models/Pacient.js
const mongoose = require('mongoose');

const pacientSchema = new mongoose.Schema({
  nom: String,
  cognoms: String,
  edat: Number,
  sexe: String,
  diagnosi: String,
});

module.exports = mongoose.model('Pacient', pacientSchema);



models/Metge.js
const mongoose = require('mongoose');

const metgeSchema = new mongoose.Schema({
  nom: String,
  especialitat: String,
  numero_licencia: String,
});

module.exports = mongoose.model('Metge', metgeSchema);

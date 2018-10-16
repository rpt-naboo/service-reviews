const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Reviews = require('../db/controllers/Reviews.js');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/../client')));

app.get('/api/:itemId', function (req, res) {
  res.send(req.params.itemId)
})

app.post('/api/:itemId', function (req, res) {
  res.send(req.params.itemId)
})

app.listen(3000, () => console.log('Now listening on port 3000'));

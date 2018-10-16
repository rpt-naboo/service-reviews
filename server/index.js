const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Reviews = require('../db/controllers/Reviews.js');
const Items = require('../db/controllers/Items.js');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/../client')));

// Get an item's reviews by its name.
// Requires data shape: {query: 'ITEM_NAME'}, where ITEM_NAME is an exact match.
app.post('/api/search', jsonParser, function (req, res) {
  const query = req.body.query;
  Items.getItemId(query).then((id) => {
    Reviews.getReviewsForItemId(id).then((reviews) => {
      res.send(reviews);
    });
  });
})

// Get reviews for item with ID itemID.
app.get('/api/items/:itemID', function (req, res) {
  const query = req.params.itemID;
  Reviews.getReviewsForItemId(query).then((reviews) => {
    res.send(reviews);
  });
})

// Post a new review to item with ID itemID.
// Requires data shape: {stars: INT, text: 'REVIEW_STRING', user_id: INT}
app.post('/api/items/:itemID', jsonParser, function (req, res) {
  const itemID = Number(req.params.itemID);
  const review = { ...req.body, item_id: itemID };
  Reviews.addNewReviewByIDs(review).then((newReview) => {
    res.send(newReview);
  });
})

// Possible future route that'll allow posting new reviews by item/user name rather than ID?

app.listen(3000, () => console.log('Now listening on port 3000'));

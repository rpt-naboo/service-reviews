const faker = require('faker');
const { instance, authenticate } = require('./db-mysql/Models.js');
const Users = require('./db-mysql/controllers/Users.js');
const Items = require('./db-mysql/controllers/Items.js');
const Reviews = require('./db-mysql/controllers/Reviews.js');

/* -------------------------------------------------- */
// Edit these values to adjust the number of records generated.
const totalUsers = 10;
const totalItems = 10;
const totalReviews = 100;
/* -------------------------------------------------- */

const usernames = [];
const items = [];
const reviews = [];

const chooseRandom = function chooseOneToMaxInclusive (max) {
  return Math.floor(Math.random() * max) + 1;
};

const generateUsers = function generateNRandomUsernames (n) {
  for (let i = 0; i < n; i++) {
    let randomName = faker.internet.userName();
    while (randomName.length > 20) {
      randomName = faker.internet.userName();
    }
    usernames.push(randomName);
  }
};

const generateItems = function generateNRandomProductNames (n) {
  for (let i = 0; i < n; i++) {
    let randomName = faker.commerce.productName();
    while (randomName.length > 50) {
      randomName = faker.commerce.productName();
    }
    items.push(randomName);
  }
};

const generateReviews = function generateNRandomReviews (n) {
  for (let i = 0; i < n; i++) {
    let randomReview = {
      stars: Math.floor(Math.random() * (6)),
      text: faker.lorem.sentences(),
      user_id: chooseRandom(totalUsers),
      item_id: chooseRandom(totalItems - 1), //ensures that the last item will have zero reviews
    };
    reviews.push(randomReview);
  }
};

const saveUsers = function saveAllGeneratedUsers () {
  return Promise.all(usernames.map(function(name) {
    return Users.addNewUser({username: name});
  }));
};

const saveItems = function saveAllGeneratedItems () {
  return Promise.all(items.map(function(item) {
    return Items.addNewItem({name: item});
  }));
};

const saveReviews = function saveAllGeneratedReviews () {
  return Promise.all(reviews.map(function(review) {
    return Reviews.addNewReviewByIDs(review);
  }));
};

generateUsers(totalUsers);
generateItems(totalItems);
generateReviews(totalReviews);

authenticate
.then(function() {
  return saveUsers();
})
.then(function() {
  return saveItems();
})
.then(function() {
  return saveReviews();
})
.then(function() {
  return instance.close();
})
.catch(function(error) {
  return console.error(error);
});
const faker = require('faker');
const db = require('./db-mysql/Models.js');
const Promise = require('bluebird');

/* -------------------------------------------------- */
// Edit these values to adjust the number of records generated.
// Increment is used when generating large numbers of records, to avoid going out of memory --
// it specifies how many records are generated at a time, rather than all at once.
const increment    = 1000;
const totalUsers   = 1000000;
const totalItems   = 100000;
const totalReviews = 10000000;
/* -------------------------------------------------- */

const chooseRandom = function chooseOneToMaxInclusive (max) {
  return Math.floor(Math.random() * max) + 1;
};

const generateUsers = function generateNRandomUsernames (n) {
  const users = [];
  for (let i = 0; i < n; i++) {
    let randomName = faker.internet.userName();
    while (randomName.length > 20) {
      randomName = faker.internet.userName();
    }
    users.push({username: randomName});
  }
  return users;
};

const generateItems = function generateNRandomProductNames (n) {
  const items = [];
  for (let i = 0; i < n; i++) {
    let randomName = faker.commerce.productName();
    while (randomName.length > 50) {
      randomName = faker.commerce.productName();
    }
    items.push({name: randomName});
  }
  return items;
};

const generateReviews = function generateNRandomReviews (n) {
  const reviews = [];
  for (let i = 0; i < n; i++) {
    let randomReview = {
      stars: Math.floor(Math.random() * (6)),
      text: faker.lorem.sentences(),
      user_id: chooseRandom(totalUsers),
      item_id: chooseRandom(totalItems - 1), //ensures that the last item will have zero reviews
    };
    reviews.push(randomReview);
  }
  return reviews;
};

const saveIncrementOfUsers = function saveAllGeneratedUsers () {
  const users = generateUsers(increment);
  return db.User.bulkCreate(users);
};

const saveIncrementOfItems = function saveAllGeneratedItems () {
  const items = generateItems(increment);
  return db.Item.bulkCreate(items);
};

const saveIncrementOfReviews = function saveAllGeneratedReviews () {
  const reviews = generateReviews(increment);
  return db.Review.bulkCreate(reviews);
};

const userIncrements = Math.floor(totalUsers / increment);
const itemIncrements = Math.floor(totalItems / increment);
const reviewIncrements = Math.floor(totalReviews / increment);

db.authenticate
.then(function() {
  let p = Promise.resolve();
  for (let i = 0; i < userIncrements; i++) {
    p = p.then(() => saveIncrementOfUsers());
  }
  return p;
})
.then(function() {
  let p = Promise.resolve();
  for (let i = 0; i < itemIncrements; i++) {
    p = p.then(() => saveIncrementOfItems());
  }
  return p;
})
.then(function() {
  let p = Promise.resolve();
  for (let i = 0; i < reviewIncrements; i++) {
    p = p.then(() => saveIncrementOfReviews());
  }
  return p;
})
.then(function() {
  return db.instance.close();
})
.catch(function(error) {
  return console.error(error);
});
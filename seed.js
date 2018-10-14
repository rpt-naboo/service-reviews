const faker = require('faker');
const db = require('./db');

const usernames = [];
const items = [];
const reviews = [];

const chooseRandom = function chooseRandomEntryFromArray (collection) {
  let index = Math.floor(Math.random() * collection.length);
  return collection[index];
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
      user: chooseRandom(usernames),
      item: chooseRandom(items),
    };
    reviews.push(randomReview);
  }
};

const saveUsers = function saveAllGeneratedUsers () {
  return new Promise.all(users.map(function(user) {
    return db.addNewUser(user);
  }));
};

const saveItems = function saveAllGeneratedItems () {
  return new Promise.all(items.map(function(item) {
    return db.addNewItem(item);
  }));
};

const saveReviews = function saveAllGeneratedReviews () {
  return new Promise.all(reviews.map(function(review) {
    return db.addNewReview(review);
  }));
};

generateUsers(10);
generateItems(10);
generateReviews(100);

saveUsers()
.then(function() {
  return saveItems();
})
.then(function() {
  return saveReviews();
})
.then(function() {
  // close db
})
.catch(function() {
  return console.error(error);
});
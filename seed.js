const faker = require('faker');
// require db helpers

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

generateUsers(10);
generateItems(10);
generateReviews(100);

// FILL ME IN
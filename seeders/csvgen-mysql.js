const fs = require('fs');
const path = require('path');
const generate = require('csv-generate');
const faker = require('faker');

const userStream = fs.createWriteStream(path.resolve(__dirname, 'users-mysql.csv'));
const itemStream = fs.createWriteStream(path.resolve(__dirname, 'items-mysql.csv'));
const reviewStream = fs.createWriteStream(path.resolve(__dirname, 'reviews-mysql.csv'));

/* -------------------------------------------------- */
// Edit these values to adjust the number of records generated.
const totalUsers   = 1000;
const totalItems   = 100;
const totalReviews = 1000000;
/* -------------------------------------------------- */

const generateUser = function generateRandomUsername () {
  let randomName = faker.internet.userName();
  while (randomName.length > 20) {
    randomName = faker.internet.userName();
  }
  return randomName;
};

const generateItem = function generateRandomProductName () {
  let randomName = faker.commerce.productName();
  while (randomName.length > 50) {
    randomName = faker.commerce.productName();
  }
  return randomName;
};

const generateReviewText = function () {
  return faker.lorem.sentences();
};

const chooseRandomScore = function () {
  return Math.floor(Math.random() * (6));
};

const chooseRandomUser = function () {
  return Math.floor(Math.random() * totalUsers) + 1;
};

const chooseRandomItem = function () {
  return Math.floor(Math.random() * (totalItems - 1)) + 1;
};

generate({
  columns: [generateUser],
  length: totalUsers
})
.pipe(userStream);

generate({
  columns: [generateItem],
  length: totalItems
})
.pipe(itemStream);

generate({
  columns: [chooseRandomScore, generateReviewText, chooseRandomUser, chooseRandomItem],
  length: totalReviews
})
.pipe(reviewStream);
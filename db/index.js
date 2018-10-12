const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD);

const User = db.define('User', {
  username: Sequelize.STRING(20),
});

const Item = db.define('Item', {
  name: Sequelize.STRING(50),
});

const Review = db.define('Review', {
  stars: Sequelize.INTEGER,
  text: Sequelize.TEXT,
});

Review.belongsTo(User);
Review.belongsTo(Item);

const addNewUser = function insertNewUser () {
  // FILL ME IN
};

const addNewReview = function insertNewReview () {
  // FILL ME IN
};

const addNewItem = function insertNewItem () {
  // FILL ME IN
};

const getAllReviews = function retrieveAllReviews() {
  // FILL ME IN
};

const getAllReviews = function retrieveAllReviews() {
  // FILL ME IN
};

const getAllReviews = function retrieveAllReviews() {
  // FILL ME IN
};
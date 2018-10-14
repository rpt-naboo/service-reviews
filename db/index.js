var Sequelize = require('sequelize');
require('dotenv').config();
//import Sequelize from 'sequelize';
//import dotenv from 'dotenv';

//dotenv.config();
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  operatorsAliases: false,
});

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

Review.belongsTo(User, {foreignKey: 'user_id'});
Review.belongsTo(Item, {foreignKey: 'item_id'});
Item.hasMany(Review, {foreignKey: 'item_id'});

User.sync();
Item.sync();
Review.sync();

const addNewUser = function insertNewUser () {
  // FILL ME IN
};

const getAllUsers = function retrieveAllUsers() {
  // FILL ME IN
};

const addNewReview = function insertNewReview () {
  // FILL ME IN
};

const getAllReviews = function retrieveAllReviews() {
  // FILL ME IN
};

const addNewItem = function insertNewItem () {
  // FILL ME IN
};

const getAllItems = function retrieveAllItems() {
  // FILL ME IN
};
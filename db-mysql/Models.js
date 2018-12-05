var Sequelize = require('sequelize');
require('dotenv').config();
//import Sequelize from 'sequelize';
//import dotenv from 'dotenv';

//dotenv.config();
const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  operatorsAliases: false,
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING(20),
});

const Item = db.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING(50),
});

const Review = db.define('Review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  stars: Sequelize.INTEGER,
  text: Sequelize.TEXT,
});

Review.belongsTo(User, {foreignKey: 'user_id'});
Review.belongsTo(Item, {foreignKey: 'item_id'});
Item.hasMany(Review, {foreignKey: 'item_id'});

User.sync();
Item.sync();
Review.sync();

module.exports = {
  User: User,
  Item: Item,
  Review: Review,
};
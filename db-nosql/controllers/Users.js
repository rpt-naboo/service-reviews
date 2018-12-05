const Models = require('../Models.js');
const User = Models.User;

const addNewUser = function insertNewUser (user) {
  return User.create(user);
};

module.exports = {
  addNewUser: addNewUser,
};
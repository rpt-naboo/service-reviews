const Models = require('../Models.js');
const User = Models.User;

console.log(Models, User);

const addNewUser = function insertNewUser (user) {
  return User.create(user);
};

const getAllUsers = function retrieveAllUsers() {
  return User.findAll();
};

module.exports.Users = {
  addNewUser: addNewUser,
  getAllUsers: getAllUsers,
};
const Models = require('../Models.js');
const Item = Models.Item;

const addNewItem = function insertNewItem (item) {
  return Item.create(item);
};

const getAllItems = function retrieveAllItems() {
  return Item.findAll();
};

module.exports.Items = {
  addNewItem: addNewItem,
  getAllItems: getAllItems,
};
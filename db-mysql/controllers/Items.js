const Models = require('../Models.js');
const Item = Models.Item;

const addNewItem = function insertNewItem (item) {
  return Item.create(item);
};

module.exports = {
  addNewItem: addNewItem,
};
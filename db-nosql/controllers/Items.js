const Models = require('../Models.js');
const Item = Models.Item;

const addNewItem = function insertNewItem (data) {
  const item = { ...data, totalStars: 0 };
  return Item.create(item);
};

module.exports = {
  addNewItem: addNewItem,
};
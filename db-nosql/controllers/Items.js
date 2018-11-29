const Models = require('../Models.js');
const Item = Models.Item;

const addNewItem = function insertNewItem (data) {
  const item = { ...data, reviewCount: 0, averageStars: null };
  return Item.create(item);
};

module.exports = {
  addNewItem: addNewItem,
};
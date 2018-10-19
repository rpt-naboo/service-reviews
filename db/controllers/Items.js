const Models = require('../Models.js');
const Item = Models.Item;

const addNewItem = function insertNewItem (item) {
  return Item.create(item);
};

const getAllItems = function retrieveAllItems() {
  return Item.findAll();
};

const getItemID = function findItemIdForName (query) {
  return Item.find({ where: {name: query}, attributes: ['id'] }).then((result) => { return result.id });
};

module.exports = {
  addNewItem: addNewItem,
  getAllItems: getAllItems,
  getItemId: getItemId,
};
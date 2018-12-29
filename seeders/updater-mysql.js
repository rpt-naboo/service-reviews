const Models = require('../db-mysql/Models.js');
const { User, Item, Review, instance } = Models;
const Promise = require('bluebird');

const getAllItems = function() {
  return Item.findAll();
};

const updateTotalStarsForItem = function(item) {
  return Review.findAll({ where: {item_id: item.id} }).then((reviews) => {
    const totalStars = reviews.reduce((sum, review) => {
      return sum + review.stars;
    }, 0);
    return item.update({
      total_stars: totalStars,
    });
  });
};

Item.findAll()
  .then((items) => {
    return Promise.all(items.map((item) => {
      return updateTotalStarsForItem(item);
    }));
  });

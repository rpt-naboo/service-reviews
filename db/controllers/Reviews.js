const Models = require('../Models.js');
const { User, Item, Review } = Models;

const addNewReview = function insertNewReviewUsingNames (review) {
  const keys = {};
  return User.find({ where: {username: review.user} })
    .then((user) => {
      keys.userID = user.id;
    })
    .then(() => {
      return Item.find({ where: {name: review.item} });
    })
    .then((item) => {
      keys.itemID = item.id;
    })
    .then(() => {
      return Review.create({
        stars: review.stars,
        text: review.text,
        user_id: keys.userID,
        item_id: keys.itemID,
      });
    })
    .catch(() => {
      return console.error(error);
    });
};

const addNewReviewByIDs = function insertNewReviewUsingIDs (review) {
  return Review.create(review);
};

const getAllReviews = function retrieveAllReviews() {
  return Review.findAll();
};

const getReviewsForItemId = function retrieveReviewsByItemId(query) {
  return Review.findAll({ where: {item_id: query}, include: [{ model: User, attributes: ['username'] }] });
};

module.exports = {
  addNewReview: addNewReview,
  addNewReviewByIDs: addNewReviewByIDs,
  getAllReviews: getAllReviews,
  getReviewsForItemId: getReviewsForItemId,
};

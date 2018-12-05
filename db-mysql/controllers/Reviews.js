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

const getReviewsForItemID = function retrieveTenOffsetReviewsForItemID(query, offset) {
  return Review.findAll({ where: {item_id: query}, offset: offset, limit: 10, include: [{ model: User, attributes: ['username'] }] });
};

const getReviewsData = function retrieveAverageScoreAndTotalReviews (query) {
  return Review.findAll({ where: {item_id: query} }).then((results) => {
    const totalStars = results.reduce((sum, review) => {
      return sum + review.stars;
    }, 0);
    const averageScore = Number((totalStars / results.length).toFixed(2));
    const data = {
      totalReviews: results.length,
      averageScore: averageScore,
    };
    return data;
  });
};

module.exports = {
  addNewReview: addNewReview,
  addNewReviewByIDs: addNewReviewByIDs,
  getReviewsForItemID: getReviewsForItemID,
  getReviewsData: getReviewsData,
};

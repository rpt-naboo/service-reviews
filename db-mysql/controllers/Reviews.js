const Models = require('../Models.js');
const { User, Item, Review } = Models;

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
  addNewReviewByIDs: addNewReviewByIDs,
  getReviewsForItemID: getReviewsForItemID,
  getReviewsData: getReviewsData,
};

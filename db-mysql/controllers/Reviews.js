const Models = require('../Models.js');
const { User, Item, Review, instance } = Models;

const addNewReviewByIDs = function insertNewReviewUsingIDs (review) {
  return instance.transaction(function (t) {
    return Review.create(review, {transaction: t})
      .then(() => {
        return Item.findById(review.item_id, {transaction: t});
      })
      .then((item) => {
        return item.increment('total_stars', {by: review.stars, transaction: t});
      });

  }).then((result) => {
    return result.reload();
  }).catch((err) => {
    return console.error(err);
  });
};

const getReviewsForItemID = function retrieveTenOffsetReviewsForItemID(query, offset) {
  return Review.findAll({ where: {item_id: query}, offset: offset, limit: 10, include: [{ model: User, attributes: ['username'] }] });
};

const getReviewsData = function retrieveAverageScoreAndTotalReviews (query) {
  let totalStars;
  return Item.findById(query)
    .then((item) => {
      totalStars = item.total_stars;
      return Review.count({ where: {item_id: item.id} });
    })
    .then((totalReviews) => {
      const averageScore = Number((totalStars / totalReviews).toFixed(2));
      const data = {
        totalReviews: totalReviews,
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

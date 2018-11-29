const Models = require('../Models.js');
const { Review, Item } = Models;

const addNewReviewByIDs = function insertNewReviewUsingIDs (review) {
  const itemID = review.item_id;
  return Item.findOne({ _id: itemID }).exec()
    .then((item) => {
      item.reviews.push(review);

      item.reviewCount = item.reviews.length;

      const totalStars = item.reviews.reduce((acc, review) => {
        return acc + review.stars;
      }, 0);
      const averageScore = Number((totalStars / item.reviewCount).toFixed(2));
      item.averageStars = averageScore;

      return item.save();
    });
};

const getReviewsForItemID = function retrieveTenOffsetReviewsForItemID(itemID, offset) {
  return Item.findById(itemID).exec()
    .then((item) => {
      const page = item.reviews.slice(offset, offset + 10);
      return page;
    });
};

const getReviewsData = function retrieveAverageScoreAndTotalReviews (itemID) {
  return Item.findOne({ _id: itemID }).select('-_id reviewCount averageStars').lean(true).exec();
};

module.exports = {
  addNewReviewByIDs: addNewReviewByIDs,
  getReviewsForItemID: getReviewsForItemID,
  getReviewsData: getReviewsData,
};

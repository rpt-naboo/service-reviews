const Models = require('../Models.js');
const { Review, Item } = Models;

const addNewReviewByIDs = function insertNewReviewUsingIDs (review) {
  const itemID = review.item_id;
  return Item.findByIdAndUpdate(itemID, { $inc: {totalStars: review.stars}, $push: {reviews: review} }).exec();
};

const getReviewsForItemID = function retrieveTenOffsetReviewsForItemID(itemID, offset) {
  return Item.findById(itemID).populate('reviews.user_id').exec()
    .then((item) => {
      const page = item.reviews.slice(offset, offset + 10);
      return page;
    });
};

//getReviewsForItemID(1, 0).then((results) => { console.log(results) });

const getReviewsData = function retrieveAverageScoreAndTotalReviews (itemID) {
  return Item.findById(itemID).exec()
    .then((item) => {
      const averageScore = Number((item.totalStars / item.reviews.length).toFixed(2));
      const data = {
        totalReviews: item.reviews.length,
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
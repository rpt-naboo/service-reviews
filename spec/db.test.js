const Items = require('../db-mysql/controllers/Items.js');
const Users = require('../db-mysql/controllers/Users.js');
const Reviews = require('../db-mysql/controllers/Reviews.js');
const Models = require('../db-mysql/Models.js');
const Promise = require('bluebird');

const { User: UserModel, Item: ItemModel, Review: ReviewModel } = Models;

// BE SURE TO SWAP DOTENV TO A FRESH TEST DATABASE BEFOREHAND AND RUN SEED.JS
// After this test is run, the database will be automatically cleared
// it should go without saying, but don't run this against a production database!

// TODO: setup so tests run the seedfile automatically
// need to understand how multiple Sequelize connections are handled
// Also setup so tests automatically point at a test database instead of having to manually configure dotenv

/* ---- Helper functions ---- */
const clearDatabase = function deleteMockDataInDatabase () {
  UserModel.drop();
  ItemModel.drop();
  ReviewModel.drop();
};

const chooseRandomNumber = function chooseRandomIntBetween1AndNInclusive (n) {
  return Math.floor(Math.random() * n) + 1;
};

/* ---- Setup and teardown ---- */
/*
afterAll(() => {
  clearDatabase();
  // close Sequelize connection
});
*/

/* ---- TESTS BEGIN HERE ---- */
test('addNewItem adds a new item', () => {
  const newItem = {
    text: 'lorem ipsum itemname',
  };
  let savedItem;

  Items.addNewItem(newItem)
    .then((result) => {
      expect(result).toEqual(newItem);
      savedItem = result;
      return ItemModel.findOne({ where: {id: result.id} });
    })
    .then((retrievedItem) => {
      expect(retrievedItem).toEqual(savedItem);
      done();
    })
    .catch((error) => {
      return console.error(error);
    });
});

test('addNewUser adds a new user', () => {
  const newUser = {
    text: 'lorem ipsum username',
  };
  let savedUser;

  Users.addNewUser(newUser)
    .then((result) => {
      expect(result).toEqual(newUser);
      savedUser = result;
      return UserModel.findOne({ where: {id: result.id} });
    })
    .then((retrievedUser) => {
      expect(retrievedUser).toEqual(savedUser);
      done();
    })
    .catch((error) => {
      return console.error(error);
    });
});

test('addNewReviewByIDs adds a new review', () => {
  const newReview = {
    stars: chooseRandomNumber(5),
    text: 'lorem ipsum reviewtext',
    user_id: chooseRandomNumber(10),
    item_id: chooseRandomNumber(9),
  };
  let savedReview;

  Reviews.addNewReviewByIDs(newReview)
    .then((result) => {
      expect(result).toEqual(newReview);
      savedReview = result;
      return ReviewModel.findOne({ where: {id: result.id} });
    })
    .then((retrievedReview) => {
      expect(retrievedReview).toEqual(savedReview);
      done();
    })
    .catch((error) => {
      return console.error(error);
    });
});

test('getReviewsForItemID gets paginated reviews for an item', () => {
  const itemID = chooseRandomNumber(9);
  const newReviews = [];
  let paginatedReviews;

  for (let i = 0; i < 10; i++) {
    newReviews.push({
      stars: chooseRandomNumber(5),
      text: 'lorem ipsum reviewtext',
      user_id: chooseRandomNumber(10),
      item_id: itemID,
    });
  }

  Promise.all(newReviews.map((review) => {
    return ReviewModel.create(review);
  }))
    .then(() => {
      return ReviewModel.findAll({ where: {item_id: itemID}, offset: 10, limit: 10, include: [{ model: User, attributes: ['username'] }] });
    })
    .then((results) => {
      paginatedReviews = results;
      return Reviews.getReviewsForItemID(itemID, 10);
    })
    .then((results) => {
      expect(results).toEqual(paginatedReviews);
      done();
    })
    .catch((error) => {
      return console.error(error);
    });
});

test('getReviewsData gets average score and total reviews for an item', () => {
  const itemID = chooseRandomNumber(9);
  let actualData;

  ReviewModel.findAll({ where: {item_id: itemID} }).then((results) => {
    const totalStars = results.reduce((sum, review) => {
      return sum + review.stars;
    }, 0);
    const averageScore = Number((totalStars / results.length).toFixed(2));
    actualData = {
      totalReviews: results.length,
      averageScore: averageScore,
    };
  })
    .then(() => {
      return Reviews.getReviewsData(itemID);
    })
    .then((results) => {
      expect(results).toEqual(actualData);
      done();
    })
    .catch((error) => {
      return console.error(error);
    });
});
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { MongooseAutoIncrementID } =  require('mongoose-auto-increment-reworked');
mongoose.connect(process.env.MONGODB_URI);
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose connected!');
});

const userSchema = new Schema({
  username: String,
});

const reviewSchema = new Schema({
  text: String,
  stars: Number,
  user_id: {type: Number, ref: 'User'},
});

const itemSchema = new Schema({
  name: String,
  totalStars: Number,
  reviews: [reviewSchema],
});

userSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'User' });
itemSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'Item' });

const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
  User: User,
  Review: Review,
  Item: Item,
};
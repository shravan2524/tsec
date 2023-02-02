const mongoose = require('mongoose');
const { Schema } = mongoose;

const follower = new Schema({
    username: String,
    default : 0,
})
const following = new Schema({
    username: String,
    default : 0,
})

const rating = new Schema({
    name: String,
    comment: String,
    rating : Number,
    default : 0,
})


const userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    address: String,
    ratings: [rating],
    followers : Array,
    followings: Array,
    wishlist: Array,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
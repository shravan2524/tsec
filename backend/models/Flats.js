const mongoose = require('mongoose');
const { Schema } = mongoose;

const flatsSchema = new Schema({
    cover_img: String,
    propertyType: String,
    title: String,
    displayPrice: String,
    address: String,
    tags: Array,
    images : Array,
    brandname: String,
    config: Array,
    description: Array,
});

const Flats = mongoose.model('flats', flatsSchema);

module.exports = Flats;
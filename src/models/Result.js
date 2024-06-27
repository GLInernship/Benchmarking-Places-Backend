const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  subRegion: Number,
  latLng: {
    lat: Number,
    lng: Number
  },
  googlePlaces: [{
    types: [String],
    name: String,
    formatted_address: String,
    lat: Number,
    lng: Number
  }],
  hereBasedOnGoogle: [{
    name: String,
    lat: Number,
    lng: Number,
    matchesGoogle: Boolean
  }],
  herePlaces: [{
    categoryType: String,
    name: String,
    address: String,
    lat: Number,
    lng: Number
  }],
  googleBasedOnHere: [{
    name: String,
    lat: Number,
    lng: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);
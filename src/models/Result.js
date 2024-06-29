const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  placeName: String,
  placeType: {
    label: String,
    googleValue: String,
    hereValue: String
  },
  results: [{
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
      matchesGoogle: Boolean,
      neededStreetSimilary: Boolean,
      neededDistanceMatch: Boolean
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
  }]
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);
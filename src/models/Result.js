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
      index: Number,
      types: [String],
      name: String,
      formatted_address: String,
      lat: Number,
      lng: Number
    }],
    hereBasedOnGoogle: [{
      index: Number,
      name: String,
      lat: Number,
      lng: Number,
      matchesGoogle: Boolean,
      neededStreetSimilary: Boolean,
      neededDistanceMatch: Boolean,
      neededNameSimilarity: Boolean,
      address: String,
      categoryHereType: String
    }],
    herePlaces: [{
      index: Number,
      categoryType: String,
      name: String,
      address: String,
      lat: Number,
      lng: Number
    }],
    googleBasedOnHere: [{
      index: Number,
      name: String,
      lat: Number,
      lng: Number
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);
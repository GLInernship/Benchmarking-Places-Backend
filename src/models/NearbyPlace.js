const mongoose = require('mongoose');

const nearbyPlaceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  data: [{
    divisionIndex: Number,
    center: {
      lat: Number,
      lng: Number,
    },
    centerAddress: String,
    pois: [{
      poi: {
        name: String,
        lat: Number,
        lng: Number,
        divisionIndex: Number,
      },
      nearbyPlace: {
        name: String,
        formatted_address: String,
        lat: Number,
        lng: Number,
      },
    }],
  }],
});

module.exports = mongoose.model('NearbyPlace', nearbyPlaceSchema);
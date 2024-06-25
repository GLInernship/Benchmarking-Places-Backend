const mongoose = require('mongoose');

const nearbyPlaceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  data: [{
    subregion_id: Number,
    center: {
      lat: Number,
      lng: Number,
    },
    centerAddress: String,
    ranLatLons: [{
      ranLatLons: {
        name: String,
        lat: Number,
        lng: Number,
        subregion_id: Number,
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
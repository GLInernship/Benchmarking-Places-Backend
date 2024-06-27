const mongoose = require('mongoose');

const GridDataSchema = new mongoose.Schema({
  subregion_id: Number,
  bounds: [String],
  center: {
    lat: Number,
    lng: Number
  },
  ranLatLonss: [{
    name: String,
    lat: Number,
    lng: Number
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GridData', GridDataSchema);
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
  }]
});

module.exports = mongoose.model('GridData', GridDataSchema);
const mongoose = require('mongoose');

const GridDataSchema = new mongoose.Schema({
  placeName: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  data: [{
    subregion_id: String,
    bounds: Object,
    center: Object,
    ranLatLonss: Object
  }]
});

module.exports = mongoose.model('GridData', GridDataSchema);
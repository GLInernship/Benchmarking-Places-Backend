const mongoose = require('mongoose');

const placeTypeSchema = new mongoose.Schema({
  label: String,
  googleValue: String,
  hereValue: String
});

const nearbyPlaceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  placeType: placeTypeSchema, // Add this line
  groupedRLatLons: [{
    subregion_id: Number,
    center: {
      lat: Number,
      lng: Number,
    },
    centerAddress: String,
    ranLatLonss: [{
      ranLatLons: {
        name: String,
        lat: Number,
        lng: Number,
        subregion_id: Number,
      },
      nearbyPlaces: [{
        name: String,
        formatted_address: String,
        lat: Number,
        lng: Number,
      }],
      hereNearbyPlaces: [{
        name: String,
        address: String,
        lat: Number,
        lng: Number,
      }],
    }],
  }],
});

module.exports = mongoose.model('NearbyPlace', nearbyPlaceSchema);
const NearbyPlace = require('../models/NearbyPlace');

exports.saveNearbyPlaces = async (req, res) => {
  try {
    const { groupedRLatLons, placeType } = req.body; // Add placeType here

    // Create a new document for this API call
    const newNearbyPlace = new NearbyPlace({
      placeType: placeType, // Add this line
      groupedRLatLons: groupedRLatLons
    });

    // Save the new document
    const savedData = await newNearbyPlace.save();

    res.status(200).json({
      success: true,
      message: 'Nearby places data saved successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error saving nearby places data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save nearby places data',
      error: error.message,
    });
  }
};

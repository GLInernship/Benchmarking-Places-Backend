const NearbyPlace = require('../models/NearbyPlace');

exports.saveNearbyPlaces = async (req, res) => {
  try {
    const { groupedRLatLons, placeType, placeName, resultLimit, searchRadius } = req.body; // Add placeType here

    // Create a new document for this API call
    const newNearbyPlace = new NearbyPlace({
      placeType: placeType, // Add this line
      groupedRLatLons: groupedRLatLons,
      placeName: placeName,
      searchRadius: searchRadius,
      resultLimit: resultLimit,
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
const Result = require('../models/Result');

exports.saveResults = async (req, res) => {
  try {
    const { placeName, placeType, results } = req.body;

    console.log('Received data:', { placeName, placeType, results: results[0] });

    const existingDocument = await Result.findOne({ placeName });

    if (existingDocument) {
      // Document exists, update with new data
      const updatedResults = existingDocument.results.slice(); // Create a copy of existing results

      results.forEach(newResult => {
        const existingResultIndex = updatedResults.findIndex(
          existingResult => 
            existingResult.latLng.lat === newResult.latLng.lat && 
            existingResult.latLng.lng === newResult.latLng.lng
        );

        if (existingResultIndex === -1) {
          // This is a new result, add it
          updatedResults.push(newResult);
        } else {
          // Update existing result
          const existingResult = updatedResults[existingResultIndex];
          
          // Update arrays with new data
          ['googlePlaces', 'hereBasedOnGoogle', 'herePlaces', 'googleBasedOnHere'].forEach(arrayName => {
            newResult[arrayName].forEach(newItem => {
              const existingItemIndex = existingResult[arrayName].findIndex(
                item => item.name === newItem.name && item.lat === newItem.lat && item.lng === newItem.lng
              );
              if (existingItemIndex === -1) {
                // New item, add it
                existingResult[arrayName].push(newItem);
              } else {
                // Existing item, update it
                existingResult[arrayName][existingItemIndex] = {
                  ...existingResult[arrayName][existingItemIndex],
                  ...newItem
                };
              }
            });
          });
        }
      });

      const updatedDocument = await Result.findOneAndUpdate(
        { placeName },
        { 
          $set: { 
            placeType,
            results: updatedResults
          }
        },
        { new: true }
      );

      res.status(200).json({ success: true, message: 'Results updated successfully', updatedDocument });
    } else {
      // Document doesn't exist, create a new one
      const newResult = new Result({
        placeName,
        placeType,
        results
      });

      const savedResult = await newResult.save();
      res.status(200).json({ success: true, message: 'New results saved successfully', savedResult });
    }
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ success: false, message: 'Error saving results', error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({}, 'placeName placeType'); // Only fetch placeName and placeType
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Error fetching results', error: error.message });
  }
};

exports.getPlaceDetails = async (req, res) => {
  try {
    const { placeName } = req.params;
    const placeDetails = await Result.findOne({ placeName });
    
    if (!placeDetails) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    res.status(200).json({ success: true, placeDetails });
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ success: false, message: 'Error fetching place details', error: error.message });
  }
};

const Result = require('../models/Result');

exports.saveResults = async (req, res) => {
  try {
    const { placeName, placeType, results } = req.body;

    console.log('Received data:', { placeName, placeType, results: results[0] });

    let updatedDocument = await Result.findOne({ placeName });

    if (updatedDocument) {
      // Document exists, update with new data
      results.forEach(newResult => {
        const existingResultIndex = updatedDocument.results.findIndex(
          existingResult => {
            // Check for a match in both hereBasedOnGoogle and googlePlaces
            const hereMatch = existingResult.hereBasedOnGoogle.some(
              herePlace => newResult.hereBasedOnGoogle.some(
                newHerePlace => herePlace.name === newHerePlace.name
              )
            );
            const googleMatch = existingResult.googlePlaces.some(
              googlePlace => newResult.googlePlaces.some(
                newGooglePlace => googlePlace.name === newGooglePlace.name
              )
            );
            // Return true only if both matches are found
            return hereMatch && googleMatch;
          }
        );

        if (existingResultIndex === -1) {
          // This is a new result, add it
          updatedDocument.results.push(newResult);
        } else {
          // Update existing result
          const existingResult = updatedDocument.results[existingResultIndex];

          // Update arrays with new data
          ['googlePlaces', 'hereBasedOnGoogle', 'herePlaces', 'googleBasedOnHere'].forEach(arrayName => {
            newResult[arrayName].forEach(newItem => {
              const existingItemIndex = existingResult[arrayName].findIndex(
                item => item.name === newItem.name
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
            // Remove duplicates based on name
            existingResult[arrayName] = existingResult[arrayName].filter((item, index, self) =>
              index === self.findIndex((t) => t.name === item.name)
            );
            // Reassign indices
            existingResult[arrayName].forEach((item, index) => {
              item.index = index + 1;
            });
          });
        }
      });

      updatedDocument.placeType = placeType;
      await updatedDocument.save();

      res.status(200).json({ success: true, message: 'Results updated successfully', updatedDocument });
    } else {
      // Document doesn't exist, create a new one
      const newResult = new Result({
        placeName,
        placeType,
        results: results.map(result => ({
          ...result,
          googlePlaces: result.googlePlaces.map((item, index) => ({ ...item, index: index + 1 })),
          hereBasedOnGoogle: result.hereBasedOnGoogle.map((item, index) => ({ ...item, index: index + 1 })),
          herePlaces: result.herePlaces.map((item, index) => ({ ...item, index: index + 1 })),
          googleBasedOnHere: result.googleBasedOnHere.map((item, index) => ({ ...item, index: index + 1 }))
        }))
      });

      updatedDocument = await newResult.save();
      res.status(200).json({ success: true, message: 'New results saved successfully', savedResult: updatedDocument });
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
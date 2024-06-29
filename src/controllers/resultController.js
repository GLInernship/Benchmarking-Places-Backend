const Result = require('../models/Result');

exports.saveResults = async (req, res) => {
  try {
    const { placeName, placeType, results } = req.body;

    // Preprocess results to ensure matchesGoogle, neededStreetSimilary, and neededDistanceMatch are Booleans
    const processedResults = results.map(result => ({
      ...result,
      hereBasedOnGoogle: result.hereBasedOnGoogle.map(subResult => {
        if (subResult) {
          return {
            ...subResult,
            matchesGoogle: subResult.matches === 'true' || subResult.matches === true,
            neededStreetSimilary: subResult.neededStreetSimilary === 'true' || subResult.neededStreetSimilary === true,
            neededDistanceMatch: subResult.neededDistanceMatch === 'true' || subResult.neededDistanceMatch === true
          };
        }
        return null;
      }).filter(Boolean) // Remove any null values
    }));

    const newResult = new Result({
      placeName,
      placeType,
      results: processedResults
    });

    const savedResult = await newResult.save();
    res.status(200).json({ success: true, message: 'Results saved successfully', savedResult });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ success: false, message: 'Error saving results', error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Error fetching results', error: error.message });
  }
};
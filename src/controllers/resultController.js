const Result = require('../models/Result');

exports.saveResults = async (req, res) => {
  try {
    let results = req.body.results;
    // Preprocess results to ensure matchesGoogle, neededStreetSimilary, and neededDistanceMatch are Booleans
    results = results.map(result => {
      if (result.hereBasedOnGoogle) {
        result.hereBasedOnGoogle = result.hereBasedOnGoogle.map(subResult => {
          // Add a check to ensure subResult is not null
          if (subResult) {
            // Convert matchesGoogle to Boolean if it's not already
            if (subResult.matches !== undefined) {
              subResult.matches = subResult.matches === 'true' || subResult.matches === true;
            }
            // Convert neededStreetSimilary to Boolean if it's not already
            if (subResult.neededStreetSimilary !== undefined) {
              subResult.neededStreetSimilary = subResult.neededStreetSimilary === 'true' || subResult.neededStreetSimilary === true;
            }
            // Convert neededDistanceMatch to Boolean if it's not already
            if (subResult.neededDistanceMatch !== undefined) {
              subResult.neededDistanceMatch = subResult.neededDistanceMatch === 'true' || subResult.neededDistanceMatch === true;
            }
          }
          return subResult;
        });
      }
      return result;
    });

    const savedResults = await Result.insertMany(results);
    res.status(200).json({ success: true, message: 'Results saved successfully', count: savedResults.length });
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
}
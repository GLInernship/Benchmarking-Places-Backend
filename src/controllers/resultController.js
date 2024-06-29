const Result = require('../models/Result');

exports.saveResults = async (req, res) => {
  try {
    let results = req.body.results;
    // Preprocess results to ensure matchesGoogle is a Boolean
    results = results.map(result => {
      if (result.hereBasedOnGoogle) {
        result.hereBasedOnGoogle = result.hereBasedOnGoogle.map(subResult => {
          // Add a check to ensure subResult is not null
          if (subResult && subResult.matchesGoogle !== undefined) {
            // Convert matchesGoogle to Boolean if it's not already
            subResult.matchesGoogle = subResult.matchesGoogle === 'true' || subResult.matchesGoogle === true;
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
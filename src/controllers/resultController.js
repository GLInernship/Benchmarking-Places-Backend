const Result = require('../models/Result');

exports.saveResults = async (req, res) => {
  try {
    const results = req.body.results;
    const savedResults = await Result.insertMany(results);
    res.status(200).json({ success: true, message: 'Results saved successfully', count: savedResults.length });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ success: false, message: 'Error saving results', error: error.message });
  }
};
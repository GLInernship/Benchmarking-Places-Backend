const GridData = require('../models/GridData');

exports.saveGridData = async (req, res) => {
  try {
    const { placeName, gridData } = req.body;
    
    // Create a single document containing all the grid data
    const newDocument = {
      placeName: placeName,
      timestamp: new Date(),
      data: gridData.map(item => ({
        subregion_id: item.subregion_id,
        bounds: item.bounds,
        center: item.center,
        ranLatLonss: item.ranLatLonss
      }))
    };
    
    // Insert the new document
    const savedData = await GridData.create(newDocument);
    
    res.status(201).json({
      success: true,
      message: 'Grid data saved successfully',
      data: savedData
    });
  } catch (error) {
    console.error('Error saving grid data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving grid data',
      error: error.message
    });
  }
};

exports.getGridData = async (req, res) => {
  try {
    // Fetch all documents, sorted by timestamp in descending order
    const gridData = await GridData.find().sort({ timestamp: -1 });
    res.status(200).json({
      success: true,
      data: gridData
    });
  } catch (error) {
    console.error('Error fetching grid data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching grid data',
      error: error.message
    });
  }
};
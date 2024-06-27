const GridData = require('../models/GridData');

exports.saveGridData = async (req, res) => {
  try {
    const { gridData } = req.body;
    
    // Create a single document that includes all gridData items
    const document = {
      data: gridData, // Store the entire array as a single field
      timestamp: new Date()
    };
    
    // Insert the single document
    const savedData = await GridData.create(document);
    
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
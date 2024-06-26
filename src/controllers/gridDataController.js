const GridData = require('../models/GridData');

exports.saveGridData = async (req, res) => {
  try {
    const { gridData } = req.body;
    
    // Clear existing data
    await GridData.deleteMany({});
    
    // Insert new data
    const savedData = await GridData.insertMany(gridData);
    
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
    const gridData = await GridData.find();
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
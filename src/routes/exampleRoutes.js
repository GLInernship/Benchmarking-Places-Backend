const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Get all examples
router.get('/', exampleController.getExamples);

// Create a new example
router.post('/', exampleController.createExample);

module.exports = router;

const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/save-results', resultController.saveResults);

module.exports = router;
const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/save-results', resultController.saveResults);

router.get('/get-results', resultController.getResults);

module.exports = router;
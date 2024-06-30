const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const resultControllerr = require('../controllers/place.controller');



router.post('/save-results', resultController.saveResults);

router.get('/get-results', resultControllerr.getAllResults);
router.get('/place/:placeName', resultController.getPlaceDetails);


module.exports = router;
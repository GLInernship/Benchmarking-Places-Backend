const express = require('express');
const router = express.Router();
const nearbyPlaceController = require('../controllers/nearbyPlaceController');

router.post('/save-nearby-places', nearbyPlaceController.saveNearbyPlaces);

module.exports = router;
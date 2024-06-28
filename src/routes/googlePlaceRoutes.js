const express = require('express');
const router = express.Router();
const googlePlaceController = require('../controllers/googlePlaceController');

router.get('/search-google-place', googlePlaceController.searchGooglePlace);

module.exports = router;
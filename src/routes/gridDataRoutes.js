const express = require('express');
const router = express.Router();
const gridDataController = require('../controllers/gridDataController');

router.post('/grid-data', gridDataController.saveGridData);
router.get('/grid-data', gridDataController.getGridData);

module.exports = router;
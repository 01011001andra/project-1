const express = require('express');
const router = express.Router();
const { get, exportToExcel, searchTelp } = require('../controllers/rekapControllers');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, get);
router.route('/export').get(protect, exportToExcel);


// cari no_telp
router.route('/search').post(protect, searchTelp)

module.exports = router;
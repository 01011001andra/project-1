const express = require('express');
const router = express.Router();
const { get, getOne, create, update, remove } = require('../controllers/PelangganControllers');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, get).post(protect, create);
router.route('/:id').put(protect, update).delete(protect, remove).get(protect, getOne);

module.exports = router;
const express = require('express');
const router = express.Router();
const { get, getOne, create, update, remove, complete } = require('../controllers/PelangganControllers');
const { protect } = require('../middleware/auth');
const { pelangganValidation } = require('../validation/validation');

router.route('/').get(protect, get).post(protect, pelangganValidation, create);
router.route('/:id').put(protect, pelangganValidation, update).delete(protect, remove).get(protect, getOne);
router.route('/complete/:id').post(protect, complete, remove)

module.exports = router;
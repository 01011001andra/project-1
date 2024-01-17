const express = require('express');
const router = express.Router();
const { get, create, update, remove } = require('../controllers/DiskonControllers');
const { protect } = require('../middleware/auth');
const { diskonValidation } = require('../validation/validation');

router.route('/').get(protect, get).post(protect, diskonValidation, create);
router.route('/:id').put(protect, diskonValidation, update).delete(protect, remove);

module.exports = router;
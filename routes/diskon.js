const express = require('express');
const router = express.Router();
const { get, create, update, remove } = require('../controllers/DiskonControllers');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, get).post(protect, create);
router.route('/:id').put(protect, update).delete(protect, remove);

module.exports = router;
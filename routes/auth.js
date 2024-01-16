const express = require('express');
const router = express.Router();
const { login, logout, autoAdmin } = require('../controllers/AuthControllers');
const { protect } = require('../middleware/auth');
const { loginValidation } = require('../validation/authValidation');

router.route('/').post(loginValidation, login).get(logout);
router.route('/autoAdmin').get(autoAdmin);

module.exports = router;
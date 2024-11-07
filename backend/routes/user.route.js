const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication.mdw');
const validateUserData = require('../middlewares/validate.mdw');
const { registerUser, loginUser } = require('../controllers/user.controller');

router.post('/register', validateUserData, registerUser);
router.post('/login', loginUser);

module.exports = router;

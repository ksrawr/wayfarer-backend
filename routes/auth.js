const express = require('express');
const router = express.Router();
const controller = require('../controllers')

/* Auth Sign Up Route */
router.post('/signup', controller.auth.register);

/* User Login Route */
router.post('/login', controller.auth.login);

/* Session Auth Verify */
router.get('/verify', controller.auth.verify);

/* Session Logout */
router.delete('/logout', controller.auth.logout);

module.exports = router;
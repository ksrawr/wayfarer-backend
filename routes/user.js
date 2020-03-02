const express = require('express');
const router = express.Router();
const controller = require('../controllers');

/* Show User */
router.get('/:id', controller.user.showUser);
/* Update User */
router.put('/:id', controller.user.updateUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.put('/:id', controller.user.updateUser);

module.exports = router;
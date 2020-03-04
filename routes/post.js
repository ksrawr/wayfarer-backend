const express = require('express');
const router = express.Router();
const controller = require('../controllers');

/* Create Post */
router.post('/posts', controller.post.createPost);

module.exports = router;
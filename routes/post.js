const express = require("express");
const router = express.Router();
const controller = require("../controllers");

/* Create Post */
router.post("/posts", controller.post.createPost);

/* Edit Post */
router.put("/posts/:id", controller.post.editPost);

/* Delete Post */
router.delete("/posts/:id", controller.post.destroyPost);

module.exports = router;

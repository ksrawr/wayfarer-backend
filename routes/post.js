const express = require("express");
const router = express.Router();
const controller = require("../controllers");

/*Index Posts*/
router.get("/posts", controller.post.index);

/* Show Post */
router.get("/posts/:id", controller.post.showPost);

/* Create Post */
router.post("/posts", controller.post.createPost);

/* Get Posts*/
router.get('/posts', controller.post.getPosts);

/* Edit Post */
router.put("/posts/:id", controller.post.editPost);

/* Delete Post */
router.delete("/posts/:id", controller.post.destroyPost);

module.exports = router;
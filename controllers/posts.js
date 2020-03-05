const db = require("../models");

const createPost = (request, response) => {
  db.Post.create(request.body, (error, createdPost) => {
    if (error)
      return response
        .status(500)
        .json({ message: "Something went wrong", error: error });

    db.User.findByIdAndUpdate(
      request.session.currentUser.id,
      { $push: { posts: createdPost._id } },
      { new: true },
      (error, updatedUser) => {
        if (error)
          return response
            .status(500)
            .json({ message: "Something went wrong", error: error });

        const responseObj = {
          status: 200,
          data: updatedUser,
          post: createdPost,
          requestedAt: new Date().toLocaleString()
        };

        response.status(200).json(responseObj);
      }
    );
  });
};

const getPosts = (req, res) => {
  db.Post.find((err, posts) => {
    console.log(posts);
    if (err) return res.status(400).json(err);
    const resObj = {
      message: "posts gotted",
      data: posts,
      requestedAt: new Date().toLocaleString
    }
    res.json(resObj);
  });
};

const editPost = (req, res) => {
  db.Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, editedPost) => {
      console.log("edit route");
      if (err) {
        return res.json(err);
      }
      const resObj = {
        message: "post updated!",
        data: editedPost,
        requestedAt: new Date().toLocaleString
      };
      res.json(resObj);
    }
  );
};

const destroyPost = (req, res) => {
  db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.json({ err });
    }
    const resObj = {
      data: deletedPost,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};

const index = (req, res) => {
  db.Post.find({}, (err, foundPosts) => {
    if (err) {
      console.log(err);
    }
    const resObj = {
      data: foundPosts,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};

const showPost = (req, res) => {
  db.Post.findByIda(req.params.id, (err, foundPost) => {
    if (err) {
      console.log(err);
    }
    const resObj = {
      data: foundPost,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};

const show = (module.exports = {
  createPost,
  editPost,
  destroyPost,
  index,
  showPost,
  getPosts
});

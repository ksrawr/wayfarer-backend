const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const PostSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  content: String,
  fakecity: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [Comment.schema],
  img: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

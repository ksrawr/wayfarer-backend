const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  homeCity: {
    type: String,
    required: [true, "Home city is required"]
  },
  userImage: {
    type: String,
    required: false
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

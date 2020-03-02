const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  descrip: { type: String },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const City = mongoose.model("City", CitySchema);

module.exports = City;

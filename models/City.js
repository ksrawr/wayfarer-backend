const mongoose = require("mongoose");

const CitySchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  descrip: { type: String }
});

const City = mongoose.model("City", CitySchema);

module.exports = City;

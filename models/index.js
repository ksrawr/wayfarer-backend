const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = "dotenv".config();

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    userFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  User: require("./User")
};

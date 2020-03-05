const db = require("../models");

const cityIndex = (req, res) => {
  db.City.find({}, (err, foundCities) => {
    if (err) {
      return res.json({ err });
    }
    res.json({ foundCities });
  });
};

module.exports = { cityIndex };

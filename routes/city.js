const express = require("express");
const router = express.Router();
const controller = require("../controllers");

//_______________________________________City Index Route

router.get("/cities", controller.cities.cityIndex);

module.exports = router;

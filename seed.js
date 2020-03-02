const db = require("./models");
const cityData = require("./seedCities.js");

console.log(cityData);

db.City.deleteMany({}, () => {
  db.City.create(cityData, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
});

/*__________________________________________Instructions
	stop your server with ctrl+c
	run 'node seed.js'
	ctrl+c again to stop node
	restart your server with nodemon
*/

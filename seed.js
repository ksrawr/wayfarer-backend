const db = require("./models");

/*__________________________________________Instructions
  This file wipes and repopulates City in the db. 
	if running, stop your server with ctrl+c
	run 'node seed.js'
	ctrl+c again to stop node
	(re)start your server with nodemon
*/

const cityData = [
  {
    name: "New Orleans",
    descrip: "United States",
    image: "https://i.imgur.com/bQBhye5.jpg"
  },
  {
    name: "Paris",
    descrip: "France",
    image: "https://i.imgur.com/gcu9zMt.jpg"
  },
  {
    name: "Paris 2",
    descrip: "United States",
    image: "https://i.imgur.com/tjV64Xs.jpg"
  },
  {
    name: "Miami",
    descrip: "United States",
    image: "https://i.imgur.com/idLp0AY.jpg"
  },
  {
    name: "San Francisco",
    descrip: "United States",
    image: "https://i.imgur.com/dFkTLAZ.jpg"
  },
  {
    name: "New York",
    descrip: "United States",
    image: "https://i.imgur.com/gVafYn2.jpg"
  },
  {
    name: "Portland",
    descrip: "United States",
    image: "https://i.imgur.com/kTXPAmE.jpg"
  },
  {
    name: "London",
    descrip: "England",
    image: "https://i.imgur.com/ZeZhlMF.jpg"
  },
  {
    name: "Dallas",
    descrip: "United States",
    image: "https://i.imgur.com/rpztLJw.jpg"
  },
  {
    name: "Tokyo",
    descrip: "Japan",
    image: "https://i.imgur.com/8gIn8zB.jpg"
  }
];

db.City.deleteMany({}, () => {
  db.City.create(cityData, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
});

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
    posts: [],
    name: "New Orleans",
    descrip: "United States",
    image: "https://i.imgur.com/d30yttO.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "Paris",
    descrip: "France",
    image: "https://i.imgur.com/XR7ISGH.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "Paris 2",
    descrip: "United States",
    image: "https://i.imgur.com/pAPf4CT.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "San Francisco",
    descrip: "United States",
    image: "https://i.imgur.com/z8eEtTu.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "Miami",
    descrip: "United States",
    image: "https://i.imgur.com/FZUfe2t.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "New York",
    descrip: "United States",
    image: "https://i.imgur.com/EezpUBp.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "Portland",
    descrip: "United States",
    image: "https://i.imgur.com/cmWywNG.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "London",
    descrip: "England",
    image: "https://i.imgur.com/q3VDpaP.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "Dallas",
    descrip: "United States",
    image: "https://i.imgur.com/O6NbtjK.jpg",
    __v: 0
  },
  {
    posts: [],
    name: "Tokyo",
    descrip: "Japan",
    image: "https://i.imgur.com/eEkv3ut.jpg",
    __v: 0
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

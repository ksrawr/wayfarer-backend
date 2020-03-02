const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

const db = require("./models");

require("dotenv").config();
/* Change to .env variable later	 */
const PORT = process.env.PORT || 4000;
const routes = require("./routes");

//__________________________MIDDLEWARE__________________________//

app.use(bodyParser.json());

/* Express Session Auth */
app.use(
  session({
    store: new MongoStore({ url: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3 // Expire in 3 hours
    }
  })
);

// app.get("/api/v1/users", (req, res) => {
//   db.User.find({}, (err, foundUsers) => {
//     if (err) {
//       return res.json({ err });
//     }
//     res.json({ foundUsers });
//   });
// });

// app.post("/api/v1/cities", (req, res) => {
//   db.City.create(req.body, (err, createdCity) => {
//     if (err) {
//       return res.json({ err });
//     }
//     res.json({ createdCity });
//   });
// });

//________________________________City API Route
app.use("/api/v1/", routes.city);

/* Auth API Routes */
app.use("/api/v1/", routes.auth);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

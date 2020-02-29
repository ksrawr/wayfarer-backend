const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const app = express();

const db = require("./models");

require("dotenv").config();
/* Change to .env variable later	 */
const PORT = process.env.PORT || 4000;
// const routes = require("./routes");

//__________________________MIDDLEWARE__________________________//

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

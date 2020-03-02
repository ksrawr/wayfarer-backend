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
// const routes = require("./routes");

//__________________________MIDDLEWARE__________________________//

app.use(bodyParser.json());

/* Express Session Auth */
app.use(session({
	store: new MongoStore({ url: process.env.MONGO_URI }),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 3 // Expire in 3 hours
	}
}));

/* Auth Sign Up Route */
app.post('/api/v1/signup', (request, response) => {

	db.User.findOne({ email: request.body.email }, (error, foundUser) => {

		if (error) return response.status(500).json({message: 'Something went wrong', error: error });

		if (foundUser) return response.status(400).json({message: 'Email already exists'});

		bcrypt.genSalt(10, (error, salt) => {

			if(error) return response.status(500).json({message: 'Something went wrong', error: error })

			bcrypt.hash(request.body.password, salt, (error, hash) => {

				if(error) return response.status(500).json({message: 'Something wrong', error: error});

				const newUser = {
					name: request.body.name,
					email: request.body.email,
					password: hash,
					homeCity: request.body.homeCity
				}

				db.User.create(newUser, (error, createdUser) => {

					if(error) return response.status(500).json({message: 'Something went wrong', error: error});

					response.sendStatus(201);

				})

			})

		})

	})

})


/* User Login Route */
app.post('/api/v1/login', (request, response) => {

	db.User.findOne({ email: request.body.email }, (error, foundUser) => {

		if(error) return response.status(500).json({message: 'Something went wrong', error: error});

		if(!foundUser) return response.status(400).json({message: 'User does not exist'});

		bcrypt.compare(request.body.password, foundUser.password, (error, isMatch) => {

			if(error) return response.status(500).json({message: "Something went wrong", error: error});

			if(isMatch) {
			  request.session.currentUser = {
			  	id: foundUser._id,
			  	name: foundUser.name,
			  	email: foundUser.email
			  };

				return response.status(200).json({message: 'Success'});
			} else {
				return response.status(400).json({message: 'Username/password is incorrect'});
			}

		})

	})

})

/* Session Auth Verify */
app.get('/api/v1/verify', (request, response) => {
	if(!request.session.currentUser) {
		return response.status(401).json({message: 'Unauthorized'})
	}

	response.status(200).json({message: `Current user verified. User ID: ${request.session.currentUser.id}`})
})

/* Session Logout */
app.delete('/api/v1/logout', (request, response) => {

	if(!request.session.currentUser) return response.status(401).json({ messsage: 'Unauthorized'})

	request.session.destroy(error => {
		if(error) return response.status(500).json({message: 'Something went wrong. Please try again'});

		response.sendStatus(200);
	})
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

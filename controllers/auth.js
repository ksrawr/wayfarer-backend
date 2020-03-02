const bcrypt = require('bcryptjs');
const db = require('../models');

/* Post Register - Create new User */
const register = (request, response) => {
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
};

/* Post Login - Check if User Matches credentials */
const login = (request, response) => {

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
};

/* Get - Verify session of logged in User */
const verify = (request, response) => {
	if(!request.session.currentUser) {
		return response.status(401).json({message: 'Unauthorized'})
	}

	response.status(200).json({message: `Current user verified. User ID: ${request.session.currentUser.id}`})
};

/* Delete - Delete Session */
const logout = (request, response) => {
	if(!request.session.currentUser) return response.status(401).json({ messsage: 'Unauthorized'})

	request.session.destroy(error => {
		if(error) return response.status(500).json({message: 'Something went wrong. Please try again'});

		response.sendStatus(200);
	})
};

module.exports = {
	register,
	login,
	verify,
	logout,
}
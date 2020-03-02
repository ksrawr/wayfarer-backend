const db = require('../models');

const showUser = (request, response) => {

	db.User.findById(request.params.id, (error, foundUser) => {

		if(error) return response.status(500).json({message: "Something went wrong", error: error});

		const responseObj = {
			status: 200,
			data: foundUser,
			requestedAt: new Date().toLocaleString(),
		}

		response.status(200).json(responseObj);

	});
}

const updateUser = (request, response) => {

	db.User.findByIdAndUpdate(request.params.id, request.body, {new: true}, (error, updatedUser) => {

		if(error) return response.status(500).json({message: "Something went wrong", error: error});

		const responseObj = {
			status: 200, 
			data: updatedUser,
			requestedAt: new Date().toLocaleString(),
		};

		response.status(200).json(responseObj);

	})

};

module.exports = {
	showUser,
	updateUser,
}
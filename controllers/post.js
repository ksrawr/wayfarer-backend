const db = require('../models');

const createPost = (request, response) => {

	db.Post.create(request.body, (error, createdPost) => {

		if(error) return response.status(500).json({message: 'Something went wrong', error: error});
 

 		db.User.findByIdAndUpdate(request.session.currentUser.id, {$push: { posts: createdPost._id } }, {new: true}, (error, updatedUser) => {
 
 			if (error) return response.status(500).json({message: 'Something went wrong', error: error});
 
 			const responseObj = {
 				status: 200,
 				data: updatedUser,
 				requestedAt: new Date().toLocaleString(),
 			};

 			response.status(200).json(responseObj);
 
 		})

	})

}

module.exports = {
	createPost,
}
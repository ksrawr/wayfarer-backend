const db = require('../models');

const createPost = (request, response) => {

	if(!request.session.currentUser) {
		return response.status(500).json({message: "Unauthorized to create a post"});
	}

	let sanityObj = {}

	request.body.user = request.session.currentUser.id;

	db.Post.create(request.body, (error, createdPost) => {

		if(error) return response.status(500).json({message: 'Something went wrong', error: error});
 

 		db.User.findByIdAndUpdate(request.session.currentUser.id, {$push: { posts: createdPost._id } }, {new: true}, (error, updatedUser) => {
 
 			if (error) return response.status(500).json({message: 'Something went wrong', error: error});
 			
 			sanityObj.userStatus = {
 				status: 200,
 				data: updatedUser,
 				requestedAt: new Date().toLocaleString()
 			}

 		})

 		db.Comment.findByIdAndUpdate(request.body.cityId, {$push: { posts: createdPost._id } }, {new: true}, (error, updatedCity) => {

 			if(error) return response.status(500).json({message: "Something went wrong"});

 			sanityObj.cityStatus = {
 				status: 200,
 				data: updatedCity,
 				requestedAt: new Date().toLocaleString()
 			}

 			const responseObj = {
 				status: 200,
 				data: createdPost,
 				requestedAt: new Date().toLocaleString(),
 				updatedModels: sanityObj
 			}

 			return response.status(200).json(responseObj)

 		})

	})

}

module.exports = {
	createPost,
}
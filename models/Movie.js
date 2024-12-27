const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Movie title is required"]
	},
	director: {
		type: String,
		required: [true, "Movie Director is needed."]
	},
	year: {
		type: Date,
		required: [true, "The date release of the movie is needed"]
	},
	description: {
		type: String,
		required: [true, "Movie description is required."]
	},
	genre: {
		type: String,
		required: [true, "Genre must be given"]
	},
	comments: [
			{
			userId: {
				type:  mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			comment: {
				type: String,
				required: [true, "User's comment is required."]
			}
		}
	]
})

module.exports = mongoose.model('Movie', movieSchema);
const Movie = require('../models/Movie');
const User = require('../models/User');
const {errorHandler} = require('../auth.js');

// 1) Add Movie
module.exports.addMovie = (req, res) => {
	const {title, director, year, description, genre} = req.body;

	return Movie.findOne({title, director, year, description, genre})
	.then(result => {
		if(result) {
			return res.status(404).json({message: "Movie already exists."})
		}

		let newMovie = new Movie({
			title,
			director,
			year,
			description,
			genre
		})

		return newMovie.save()
		.then(savedMovie => res.status(201).json({
			success: true,
			result: savedMovie
		}))
		.catch(err => errorHandler(err,req,res));
	})
}

// 2) Get Movie
module.exports.getMovies = (req,res) => {
	return Movie.find()
	.then(result => res.status(200).json({movies: result}))
	.catch(err => errorHandler(err, req, res));
}

// 3) Get Movie by Id
module.exports.getMovieById = (req, res) => {
	const movieId = req.params.movieId;

	return Movie.findById(movieId)
	.then(result => res.status(200).json(result))
	.catch(err => errorHandler(err, req, res));
}

// 4) Update Movie by Id
module.exports.updateMovieById = (req, res) => {
	const movieId = req.params.movieId;
	const {title, director, year, description, genre} = req.body;

	let updatedInfo = {
		title,
		director,
		year,
		description,
		genre
	}

	return Movie.findByIdAndUpdate(movieId, updatedInfo, {new: true})
	.then(result => res.status(200).json({message: "Movie updated successfully!", updatedMovie: result}))
	.catch(err => errorHandler(err, req, res));
}

// 5) Delete Movie by ID
module.exports.deleteMovieById = (req, res) => {
	const movieId = req.params.movieId;

	return Movie.findByIdAndDelete(movieId)
	.then(result => res.status(200).json({message: "Movie deleted successfully!"}))
	.catch(err => errorHandler(err,req,res));
}

// -----ADD COMMENTS

// 1) Add Comment by Id
module.exports.addComment = (req, res) => {
	const movieId = req.params.movieId;
	const userId = req.user.id;
	const {comment} = req.body;

	return Movie.findById(movieId)
	.then(movie => {
		if (!movie){
			return res.status(404).json({message: "Movie not found!"});
		}

		const commentExists = movie.comments.some(existingComment => 
  		existingComment.userId.toString() === userId && existingComment.comment === comment);


		if(commentExists){
			return res.status(409).json({message:"Comment already saved!"});
		}

		let newComment = {
			userId,
			comment
		};

		movie.comments.push(newComment);

		return movie.save()
		  .then(updatedMovieComments => {
		    return res.status(200).json({
		      message: "Comment added successfully!",
		      updatedMovie: updatedMovieComments
		    })
		  })
		.catch(err => errorHandler(err,req,res));
	})
}

// 2) Get Comment by Id
module.exports.getCommentsById = (req, res) => {
	const movieId = req.params.movieId;

	return Movie.findById(movieId)
	.then(result => {
		return res.status(200).json(result.comments);
	})
	.catch(err => errorHandler(err, req, res));
}

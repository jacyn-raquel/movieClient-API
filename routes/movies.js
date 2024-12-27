const express = require('express');
const movieControllers = require('../controllers/movies');
const router = express.Router();
const {verify, verifyAdmin} = require('../auth.js');


// 1) Add movie
router.post('/addMovie', verify, verifyAdmin, movieControllers.addMovie);

// 2) Get movie
router.get('/getMovies', verify, movieControllers.getMovies);

// 3) Get movie by Id
router.get('/getMovie/:movieId', verify, movieControllers.getMovieById);

// 4) Update movie by Id
router.patch('/updateMovie/:movieId', verify, verifyAdmin, movieControllers.updateMovieById);

// 5) Delete movie by Id
router.delete('/deleteMovie/:movieId', verify, verifyAdmin, movieControllers.deleteMovieById);

// 6) Add a comment by Id
router.patch('/addComment/:movieId', verify, movieControllers.addComment);

// 7) Get comments by Id
router.get('/getComments/:movieId', verify, movieControllers.getCommentsById);

module.exports = router;
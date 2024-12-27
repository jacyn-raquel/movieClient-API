const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// routes require
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

// dotenv config
dotenv.config();

// create app
const app = express();

// middleware to let the api understand json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// mongoose connection
mongoose.connect(`${process.env.MONGODB_STRING}`);

const db = mongoose.connection;

// Check connection
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", ()=> console.log("Successfully connected to MongoDB Atlas!"));

const corsOptions = {
	origin: [`http://localhost:3000`, `http://localhost:4000`, `http://localhost:8000`],
	credentials: true,
	optionsSuccessStatus:200
}

app.use(cors(corsOptions));

// Routes
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

// App listens

if(require.main === module){
	app.listen(process.env.PORT || 4001, ()=> console.log(`API is now online on port ${process.env.PORT || 4001}` ))
}

module.exports = {app, mongoose};

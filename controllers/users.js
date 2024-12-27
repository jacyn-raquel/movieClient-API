const User = require('../models/User');
const bcrypt = require('bcrypt');
const {errorHandler, createAccessToken} = require('../auth.js');

// 1) Register User
module.exports.registerUser = (req,res) => {
	const {email, password} = req.body;

	if(email.includes('@') && password.length > 8){
		return User.findOne({email})
		.then(result => {
			if(result){
				return res.status(409).json({message: "User Account already exists."})
			}

			let newUser = new User({
				email,
				password: bcrypt.hashSync(password, 10)
			});

			return newUser.save()
			.then(savedUser => {
				res.status(201).json({
					message: "Registered Successfully"
				})
			})
			.catch(error => errorHandler(error, req,res));
		})
	}

	return res.status(400).json({
		message: "Email or password is invalid!"
	})
}

// 2) Login User
module.exports.loginUser = (req, res) => {
	const {email, password} = req.body;

	if(email.includes("@")){
		return User.findOne({email})
		.then(result => {

			if(!result){
				return res.status(404).json({
					message: "Account does not exist. Create one first."
				})
			}
			const  isPasswordCorrect = bcrypt.compareSync(password, result.password) ? res.status(200).json({access: createAccessToken(result)}) : res.status(401).json({message: "Incorrect email or password!"});
		})
		.catch(error => errorHandler(error, req,res));
	}
	
}

// 3) Get User details
module.exports.getUserDetails = (req, res) => {
	return User.findById(req.user.id)
	.then(result => {
		if (!result) {
			return res.status(404).json({
				message: "No accounts found."
			})
		}

		return res.status(200).json({
			result
		})
	})
	.catch(error => errorHandler(error, req, res));
}

// 4) Get Specific User Detail
module.exports.getSpecificDetail = (req,res) => {
	const userId = req.params.userId;

	return User.findById(userId)
	.then(result => {
		if(!result){
			return res.status(404).json({
				message: "User does not exist."
			})
		}

		return res.status(200).json({
			result: result
		})
	})
}
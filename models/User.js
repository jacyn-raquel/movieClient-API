const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is needed to register or login"]
	},
	isAdmin : {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: [true, "Password is a must."]
	}
})

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: 'Enter your name'
	},
	email: {
		type: String,
		index: { unique: true },
		required: 'Enter your email'
	},
	password: {
		type: String,
		required: 'Enter your password'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);
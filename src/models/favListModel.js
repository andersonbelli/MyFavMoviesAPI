const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavListSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	movieId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('FavList', FavListSchema)
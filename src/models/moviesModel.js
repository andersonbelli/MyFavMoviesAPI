const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
	title: {
		type: String,
		required: 'Enter the movie title'
	},
	image_url: {
		type: String,
		default: "https://i.ibb.co/JR2nHSn/movie-placeholder.png"
	},
	genre: [String],
	release_date: { type: String },
	main_actors: [String],
	summarized_plot: {
		type: String
	},
	youtube_trailer: {
		type: String
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Movies', MoviesSchema);
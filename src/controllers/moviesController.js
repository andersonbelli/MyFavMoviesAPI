const mongoose = require('mongoose'),
	Movies = mongoose.model('Movies');

exports.list_mostly_added_movies = (_, res) => {
	Movies.find({}, (err, movies) => {
		if (err) throw err;

		if (movies != null) {
			return res.json(movies);
		} else {
			res.header("Access-Control-Allow-Origin", "*");

			return res
				.status(500)
				.json({ error: "Something went wrong." })
		}
	})
		.sort({ 'created_date': 'desc' })
		.limit(10);
};

exports.movie_details = (req, res) => {

	if (mongoose.Types.ObjectId.isValid(req.params.idMovie)) {
		Movies.findById(req.params.idMovie, (err, movie) => {
			if (err) throw err;

			if (movie != null) {
				return res.json(movie);
			} else if (movie == null) {
				return res.status(404).json({ error: "ID not found" })
			} else {
				return res.status(500).json({ error: "Something went wrong." })
			}
		});
	} else {
		res.status(400).json({ error: "Invalid ID" })
	}
};

exports.create_movie = (req, res) => {
	let new_movie = new Movies(req.body);

	new_movie.save((err, movie) => {
		if (err) throw err;

		res.status(201).json(movie);
	});
};

exports.update_movie = (req, res) => {
	Movies.findOneAndUpdate({ _id: req.params.idMovie }, req.body, { new: true },
		(err, movie) => {
			if (err) throw err;

			res.json(movie);
		});
};

exports.delete_movie = (req, res) => {
	Movies.deleteOne({ _id: req.params.idMovie },
		(err, _) => {
			if (err) throw err;

			res.json({ message: 'Movie successfully deleted!' });
		});
};
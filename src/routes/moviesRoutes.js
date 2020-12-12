var cors = require('cors');

module.exports = (app) => {
	const movies = require('../controllers/moviesController');

	app.use(cors());

	app.route('/movies')
		.get(movies.list_mostly_added_movies)
		.post(movies.create_movie);

	app.route('/movies/:idMovie')
		.get(movies.movie_details)
		.put(movies.update_movie)
		.delete(movies.delete_movie);
};
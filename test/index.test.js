const config = require('../config/config.json');
config.DBHost = 'mongodb://localhost/MyFavMoviesTEST';

uri = 'localhost:3001';

idUser = 0;
idMovie = 0;

require('../index');

require('./movies/movies.test');
require('./user/user.test');
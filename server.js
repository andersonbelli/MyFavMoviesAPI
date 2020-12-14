require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

require('./config/dbConfig');

var timeout = require('connect-timeout');

const express = require('express'),
	app = express();

app.use(timeout('10s'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./src/models/moviesModel');
const moviesRoutes = require('./src/routes/moviesRoutes');
moviesRoutes(app);

require('./src/models/userModel');
const userRoutes = require('./src/routes/userRoutes');
userRoutes(app);

require('./src/models/favListModel');
const favList = require('./src/routes/favListRoutes');
favList(app);

app.get('*', (req, res) => {
	res.status(404).send({ error: `${req.originalUrl} not found` })
});

module.exports = app;
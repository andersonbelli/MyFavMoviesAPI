const express = require('express'),
	app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req, res) => {
	res.status(404).send({ error: `${req.originalUrl} not found` })
});

module.exports = app;
const app = require('./server'),
	port = process.env.port || 3000;

app.listen(port);
console.log(`MyFavMovies Restful API server started on: ${port}`);
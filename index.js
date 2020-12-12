const app = require('./server'),
	port = process.env.port || 3001;

app.listen(port);
console.log(`MyFavMovies Restful API server started on: ${port}`);
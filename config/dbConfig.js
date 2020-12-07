/* 
	The file `config.json` is used to set the database URI depending on the execution type: "real" or "test".
	By default is set the real and it is changed in the test/index.js
*/
const config = require('./config.json')
const URI = config.DBHost;

const mongoose = require('mongoose');

mongoose.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

mongoose.connection
	.once('open', () => console.log(`Database connected and using uri: ${URI}`))
	.on('error', (error) => console.error(Error, error));
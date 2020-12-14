const jwt = require('jsonwebtoken');

exports.verifyJWT = async (req, res) => {

	console.log(req.method);

	if (req.headers != undefined) {
		const token = req.headers['authorization'];

		if (!token) {
			res.status(401).json({ auth: false, message: 'No token provided.' });
			throw 'No token provided.';
		}

		try {
			jwt.verify(token.split(' ')[1], process.env.SECRET, function (err, decoded) {
				if (err) {
					res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
					throw 'Failed to authenticate token.';
				}

				req.userId = decoded.id;
			});
		} catch (e) {
			res.status(500).json({ auth: false, message: 'Unexpected error' });
			throw 'JWT > ' + e;
		};
	} else {
		res.status(401).json({ auth: false, message: 'No token provided.' });
		throw 'No token provided.';
	}
};

exports.generateAccessToken = (user) => {
	const id = user._id;

	return jwt.sign({ id }, process.env.SECRET, {
		expiresIn: 3600 // expires in 1 hour
	});
}
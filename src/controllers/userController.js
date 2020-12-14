const auth = require('../controllers/authController');

const mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.create_user = (req, res) => {
	let new_user = new User(req.body);
	new_user.save((err, user) => {
		if (err) {
			if (err.message.includes("duplicate")) {
				return res.status(409).json({ "message": "Email already in use" });
			}

			throw err
		};

		// res.status(201).json(user);
		return res.status(201).json({ _id: user._id, token: auth.generateAccessToken(user) });
	});
};

exports.delete_user = (req, res) => {
	auth.verifyJWT(req, res).then((_) => {
		User.deleteOne({ _id: req.params.idUser },
			(err, _) => {
				if (err) throw err;

				res.json({ message: 'User successfully deleted!' });
			});
	}).catch((e) => {
		console.error(req.headers);
		console.error("\nauth - ERROR > " + e);
	});
};

exports.login_user = (req, res) => {
	User.findOne({
		"email": req.body.email,
		"password": req.body.password
	}, (err, user) => {
		if (err) throw err;

		if (user != null) {
			// return res.json(user);
			return res.json({ auth: true, token: auth.generateAccessToken(user) });
		} else if (user == null) {
			return res.status(404).json({ error: "User not found" })
		} else {
			return res.status(500).json({ error: "Something went wrong." })
		}
	});
};

exports.logout_user = (_, res) => {
	res.json({ auth: false, token: null });
};
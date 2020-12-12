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

		res.status(201).json(user);
	});
};

exports.delete_user = (req, res) => {
	User.deleteOne({ _id: req.params.idUser },
		(err, _) => {
			if (err) throw err;

			res.json({ message: 'User successfully deleted!' });
		});
};

exports.login_user = (req, res) => {
	User.findOne({
		"email": req.body.email,
		"password": req.body.password
	}, (err, user) => {
		if (err) throw err;

		if (user != null) {
			return res.json(user);
		} else if (user == null) {
			return res.status(404).json({ error: "User not found" })
		} else {
			return res.status(500).json({ error: "Something went wrong." })
		}
	});
};
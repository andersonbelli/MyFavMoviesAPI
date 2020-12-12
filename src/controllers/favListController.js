const mongoose = require('mongoose'),
	FavList = mongoose.model('FavList');

let is_added_in_user_list = false;

exports.add_fav = (req, res) => {
	if (mongoose.Types.ObjectId.isValid(req.body.userId) &&
		mongoose.Types.ObjectId.isValid(req.body.movieId)
	) {

		if (!is_added_in_user_list) {
			let new_favMovie = new FavList(req.body);
			new_favMovie.save((err, movie) => {
				if (err) throw err;

				if (movie != null) {
					return res.json({ message: "Movie successfully added to user fav list" });
				} else {
					return res.status(500).json({ error: "Something went wrong" });
				}
			});
		} else {
			return res.status(409).json({ error: "Movie already added in fav list!" });
		}
	} else {
		res.status(400).json({ error: "Invalid ID" })
	}
};

exports.remove_fav = (req, res) => {
	if (mongoose.Types.ObjectId.isValid(req.body.userId) &&
		mongoose.Types.ObjectId.isValid(req.body.movieId)
	) {
		FavList.deleteOne({
			userId: req.body.userId,
			movieId: req.body.movieId
		}, (err, _) => {
			if (err) throw err;

			res.json({ message: 'Movie successfully removed from list!' });
		});

	} else {
		return res.status(400).json({ error: "Invalid movie ID" })
	}
};

exports.get_all_fav = (req, res) => {
	FavList.find({
		"userId": req.params.userId
	}, (err, favs) => {
		if (err) throw err;

		if (favs != null) {
			return res.json(favs);
		} else if (favs == null) {
			return res.status(404).json({ error: "ID not found" })
		} else {
			return res.status(500).json({ error: "Something went wrong" });
		}
	})
		.sort({ 'created_date': 'desc' });
};

async function get_fav(req, res) {
	await FavList.find({
		"userId": req.body.userId,
		"movieId": req.body.movieId
	}, (err, favs) => {
		if (err) throw err;

		if (favs.length != 0) {
			is_added_in_user_list = true;
			return res.status(409).json({ error: "Movie already in list!" })
		} else if (favs.length == 0) {
			is_added_in_user_list = false;
			return res.status(200).json({ message: "Movie not added" })
		} else {
			return res.status(500).json({ error: "Something went wrong" });
		}
	})
		.sort({ 'created_date': 'desc' });
}

exports.get_fav = (req, res) => {
	get_fav(req, res);
};;
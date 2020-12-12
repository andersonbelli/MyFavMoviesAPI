module.exports = (app) => {
	const favList = require('../controllers/favListController');

	app.route('/favlist')
		.get(favList.get_fav)
		.post(favList.add_fav)
		.delete(favList.remove_fav);

	app.route('/favlist/:userId')
		.get(favList.get_all_fav)
};
module.exports = (app) => {
	const user = require('../controllers/userController');

	app.route('/user/createuser')
		.post(user.create_user);

	app.route('/user')
		.post(user.login_user)

	app.route('/user/:idUser')
		.delete(user.delete_user)
};
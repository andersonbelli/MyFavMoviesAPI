const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);

let expect = chai.expect;

describe('Users', () => {
	let new_user = {
		'name': 'Belli',
		'email': 'belli@belli.com',
		'password': 'p@ssw0rd'
	}

	function createUser() {
		return chai.request(`${uri}`)
			.post('/user/createuser')
			.send(new_user);
	};

	function deleteUser() {
		return chai.request(`${uri}`)
			.delete(`/user/${idUser}`);
	}

	describe('Happy path', () => {
		describe('POST /user/createuser', () => {
			it('insert new user, expect to return inserted user data', (done) => {
				createUser()
					.end((err, res) => {
						if (err) throw err;
						expect(res.status).to.be.eql(201);
						expect(res.body).to.contain.key("_id");

						idUser = res.body._id;
					});

				done();
			});
		});

		describe('POST /user', () => {
			it('login, expect to authenticate user', (done) => {
				chai.request(`${uri}`)
					.post(`/user`)
					.send({
						"email": new_user.email,
						"password": new_user.password
					})
					.end((err, res) => {
						if (err) throw err;
						expect(res.status).to.be.eql(200);
						expect(res.body).to.contain.key("_id");
						expect(res.body.name).to.be.equal(new_user.name);
						done();
					});
			});
		});

		describe('DELETE /user/:idUser', () => {
			it('remove user, expect to return successfull message', (done) => {
				deleteUser()
					.end((err, res) => {
						if (err) throw err;
						expect(res.status).to.be.eql(200);
						expect(res.body).to.contain.key("message");
						expect(res.body.message).to.contain("successfully");
						done();
					});
			});
		});
	});

	describe('Errors', () => {
		describe('POST /user', () => {
			it('duplicate user, expect to give "409 - conflict" status code', (done) => {
				createUser()
					.end((err, res) => {
						if (err) throw err;

						expect(res.status).to.be.eql(201);

						idUser = res.body._id;

						createUser()
							.end((err, res) => {
								if (err) throw err;
								expect(res.status).to.be.eql(409);
								expect(res.body).to.contain.key("message");
								expect(res.body.message).to.be.eql("Email already in use");

								deleteUser()
									.end((err, res) => {
										if (err) throw err;
										expect(res.status).to.be.eql(200);
										expect(res.body).to.contain.key("message");
										expect(res.body.message).to.contain("successfully");
									});

								done();
							});
					});
			});
		});
	});
});
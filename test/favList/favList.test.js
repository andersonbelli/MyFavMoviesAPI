const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);

let expect = chai.expect;

describe('Add movie to user\'s fav list', () => {
	describe('POST /favlist', () => {
		it('expect to add movie to user fav list', (done) => {
			chai.request(`${uri}`)
				.post('/favlist')
				.send({
					'user_id': idUser,
					'movie_id': idMovie
				})
				.end((err, res) => {
					if (err) throw err;

					expect(res.status).to.be.eql(200);
					expect(res.body).to.contain.key('message');
					expect(res.body.message).to.contain('successfully');

					expect(res.body.user_id).to.be.eql(idUser);
					expect(res.body.movie_id).to.be.eql(idMovie);

					done();
				});
		});
	});

	describe('DELETE /favlist', () => {
		it('expect to remove movie from user\'s fav list', (done) => {
			chai.request(`${uri}`)
				.delete(`/favlist`)
				.send({
					'user_id': idUser,
					'movie_id': idMovie
				})
				.end((err, res) => {
					if (err) throw err;

					expect(res.status).to.be.eql(200);
					expect(res.body).to.contain.key('message');
					expect(res.body.message).to.contain('successfully');

					done();
				});
		});
	});
});
const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);

let expect = chai.expect;

// const uri = 'localhost:3000';

describe('Movies', () => {
	describe('POST /movie', () => {
		let new_movie = {
			"title": "The Dark Knight",
			"image_url": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
			"genre": ["Action", "Crime", "Drama"],
			"release_date": "18/06/2008",
			"main_actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
			"summarized_plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
			"youtube_trailer": "https://www.youtube.com/watch?v=EXeTwQWrcwY"
		}

		it('insert new movie, expect to return inserted movie data', (done) => {
			chai.request(`${uri}`)
				.post('/movies')
				.send(new_movie)
				.end((err, res) => {
					if (err) throw err;
					expect(res.status).to.be.eql(201);
					expect(res.body).to.contain.key("_id");

					idMovie = res.body._id;

					done();
				});
		});
	});

	describe('GET /movies', () => {
		it('expect to return 10 most recently added movies', (done) => {
			chai.request(`${uri}`)
				.get('/movies')
				.end((err, res) => {
					if (err) throw err;
					expect(res.status).eql(200);
					expect(res.body).to.be.a('array');
					expect(res.type).to.contains("application/json");
					expect(res.body).to.not.be.empty;
					expect(res.body.length).to.be.lessThan(11);
					done();
				});
		});
	});

	describe('GET /movies/:idMovie', () => {
		it('expect to return movie details', (done) => {
			chai.request(`${uri}`)
				.get(`/movies/${idMovie}`)
				.end((err, res) => {
					if (err) throw err;
					expect(res.status).to.be.eql(200);
					expect(res.body).to.be.a('object');
					expect(res.body._id).to.be.eql(idMovie);
					expect(res.body).not.to.be.empty;
					done();
				});
		});
	});

	describe('PUT /movies/:idMovie', () => {
		let update_movie = {
			"title": "Batman: The Dark Knight"
		}

		it('update movie, expect to return movie updated data', (done) => {
			chai.request(`${uri}`)
				.put(`/movies/${idMovie}`)
				.send(update_movie)
				.end((err, res) => {
					if (err) throw err;
					expect(res.status).to.be.eql(200);
					expect(res.body).to.contain.key("_id");
					expect(res.body.title).to.be.equal(update_movie.title);
					done();
				});
		});
	});

	describe('DELETE /movies/:idMovie', () => {
		it('remove movie, expect to return successfull message', (done) => {
			chai.request(`${uri}`)
				.delete(`/movies/${idMovie}`)
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
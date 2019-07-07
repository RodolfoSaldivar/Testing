const { expect, request } = require('chai');
const server = require('../../app');
const { authenticate } = require('../lib');

describe('----> GET - All', () => {
	//================================================

	it('200 - Success', (done) => {
		request(server)
			.get('/api/users')
			.set('cookie', [authenticate])
			.end((err, res) => {
				// console.log('res: ', res.body);
				// res.should.have.status(200);
				expect(res.status).to.equal(200);
				done();
			});
	});

	//================================================

	it('401 - Unauthorized', (done) => {
		request(server)
			.get('/api/users')
			.end((err, res) => {
				// console.log('res: ', res.body);
				// res.should.have.status(200);
				expect(res.status).to.equal(401);
				done();
			});
	});

	//================================================

	it('403 - Forbidden', (done) => {
		request(server)
			.get('/api/users')
			.end((err, res) => {
				// console.log('res: ', res.body);
				// res.should.have.status(200);
				expect(res.status).to.equal(403);
				done();
			});
	});

	//================================================
});

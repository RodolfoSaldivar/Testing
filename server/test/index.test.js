process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const Fixtures = require('node-mongodb-fixtures');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);
const fixtures = new Fixtures({
	dir: 'server/test/fixtures',
	mute: true
});

let mongoServer;
before((done) => {
	(async (done) => {
		try {
			mongoServer = new MongoMemoryServer();
			const mongoUri = await mongoServer.getConnectionString();

			await fixtures.connect(mongoUri);
			await fixtures.unload();
			await fixtures.load();
			await fixtures.disconnect();

			await mongoose.connect(mongoUri, {
				useNewUrlParser: true,
				useFindAndModify: false
			});
			done();
		} catch (err) {
			console.log('Test db: ', err);
			done(err);
		}
	})(done);
});

after(() => {
	mongoose.disconnect();
	mongoServer.stop();
});

require('./Users');

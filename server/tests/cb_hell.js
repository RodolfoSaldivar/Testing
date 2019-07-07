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

	// mongoServer = new MongoMemoryServer();
	// mongoServer
	// 	.getConnectionString()
	// 	.then((mongoUri) => {
	// 		return fixtures
	// 			.connect(mongoUri, {
	// 				useNewUrlParser: true
	// 			})
	// 			.then(() => fixtures.unload())
	// 			.then(() => fixtures.load())
	// 			.then(() => {
	// 				return mongoose.connect(
	// 					mongoUri,
	// 					{
	// 						useNewUrlParser: true,
	// 						useFindAndModify: false
	// 					},
	// 					(err) => {
	// 						if (err) done(err);
	// 					}
	// 				);
	// 			})
	// 			.catch((e) => console.error(e))
	// 			.finally(() => fixtures.disconnect());
	// 	})
	// 	.then(() => done());
});

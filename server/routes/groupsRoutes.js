const { groupImage } = require('../lib/multerImage');

module.exports = (app) => {
	//================================================
	//----> Create group

	app.post('/api/groups', (req, res) => {
		groupImage(req, res, (err) => {
			if (err) {
				console.log('Multer groupImage: ', err.message);
				return res.status(400).send({ message: err.message });
			}
			// console.log('Request ---', req.body);
			// console.log('Request file ---', req.file);
			/*Now do where ever you want to do*/
			return res.status(200).send('si llega');
			//================================================
			//================================================
			// falta borrar la imagen en dado caso que no se guarde en la bdd
		});
	});
};

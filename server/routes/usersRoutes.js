const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {
	auth,
	usersValidator,
	sendValidationErrors
} = require('../middlewares');

const User = mongoose.model('users');

module.exports = (app) => {
	//================================================
	//----> Get all

	app.get(
		'/api/users',
		/*auth.isLoggedIn,*/ async (req, res) => {
			try {
				const response = await User.find();
				res.send({ data: response });
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);

	//================================================
	//----> Get by ID

	app.get(
		'/api/users/:id',
		/*auth.isLoggedIn,*/
		usersValidator.mongoId,
		sendValidationErrors,
		async (req, res) => {
			try {
				const response = await User.find({
					_id: req.params.id
				});
				res.send({ data: response });
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);

	//================================================
	//----> Get by mail

	app.get(
		'/api/users/mail/:mail',
		/*auth.isLoggedIn,*/
		async (req, res) => {
			try {
				const response = await User.find({
					mail: req.params.mail
				});
				res.send({ data: response });
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);

	//================================================
	//----> Get by name

	app.get(
		'/api/users/name/:name',
		/*auth.isLoggedIn,*/ async (req, res) => {
			try {
				const response = await User.find({
					name: req.params.name
				});
				res.send({ data: response });
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);

	//================================================
	//----> Create user

	app.post(
		'/api/users',
		usersValidator.save,
		sendValidationErrors,
		usersValidator.uniqueMail,
		async (req, res) => {
			const { password } = req.body;
			try {
				const hash = await bcrypt.hash(password, 10);
				const body = {
					...req.body,
					password: hash
				};
				const nuevaUser = new User(body);
				const response = await nuevaUser.save();
				res.send(response);
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);

	//================================================
	//----> Edit user

	app.put(
		'/api/users/:id',
		/*auth.isLoggedIn,*/
		usersValidator.mongoId,
		usersValidator.save,
		sendValidationErrors,
		usersValidator.sameMail,
		async (req, res) => {
			const { password } = req.body;
			try {
				const hash = await bcrypt.hash(password, 10);
				const body = {
					...req.body,
					password: hash
				};
				const response = await User.findOneAndUpdate(
					{ _id: req.params.id },
					body,
					{ new: true }
				).exec();

				if (!response) {
					return res.status(404).send({
						message: 'User not found.'
					});
				}

				res.send(response);
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);

	//================================================
	//----> Delete user

	app.delete(
		'/api/users/:id',
		/*auth.isLoggedIn,*/
		usersValidator.mongoId,
		sendValidationErrors,
		async (req, res) => {
			try {
				const response = await User.deleteOne({
					_id: req.params.id
				});

				if (!response.deletedCount) {
					return res.status(404).send({
						message: 'User not found.'
					});
				}

				res.send({ message: 'Deleted successfully.' });
			} catch (error) {
				console.log('error: ', error.message);
				res.status(500).send({ message: 'Server Error.' });
			}
		}
	);
};

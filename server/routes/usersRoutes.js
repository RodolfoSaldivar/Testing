const _ = require('lodash');
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
				res.send(await User.getAll());
			} catch (err) {
				User.logError(res, 'getAll', err.message);
			}
		}
	);

	//================================================
	//----> Get by groups

	app.get(
		'/api/users/groups',
		/*auth.isLoggedIn,*/ async (req, res) => {
			try {
				let { group_id } = req.query;
				if (!_.isArray(group_id)) group_id = [group_id];

				res.send(await User.getByGroups(group_id));
			} catch (err) {
				User.logError(res, 'getAll', err.message);
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
				res.send(await User.getById(req.params.id));
			} catch (err) {
				User.logError(res, 'getById', err.message);
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
				res.send(await User.getByMail(req.params.mail));
			} catch (err) {
				User.logError(res, 'getByMail', err.message);
			}
		}
	);

	//================================================
	//----> Get by name

	app.get(
		'/api/users/name/:name',
		/*auth.isLoggedIn,*/ async (req, res) => {
			try {
				res.send(await User.getByName(req.params.name));
			} catch (err) {
				User.logError(res, 'getByName', err.message);
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
			try {
				const { password } = req.body;
				const hash = await bcrypt.hash(password, 10);
				const body = { ...req.body, password: hash };
				res.send(await User.create(body));
			} catch (err) {
				User.logError(res, 'create', err.message);
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
			try {
				const { password } = req.body;
				const hash = await bcrypt.hash(password, 10);
				const body = {
					...req.body,
					password: hash
				};
				const response = await User.update(req.params.id, body);

				if (!response) {
					return res.status(404).send({ message: 'User not found.' });
				}

				res.send(response);
			} catch (err) {
				User.logError(res, 'update', err.message);
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
				const response = await User.delete(req.params.id);

				if (!response.deletedCount) {
					return res.status(404).send({ message: 'User not found.' });
				}

				res.send({ message: 'Deleted successfully.' });
			} catch (err) {
				User.logError(res, 'delete', err.message);
			}
		}
	);
};

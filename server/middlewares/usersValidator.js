const mongoose = require('mongoose');
const { body, param } = require('express-validator');

const User = mongoose.model('users');

//================================================

module.exports.uniqueMail = async (req, res, next) => {
	try {
		const user = await User.find({
			mail: req.body.mail
		});
		if (user[0])
			return res.status(400).send({ message: 'Mail already registered.' });
	} catch (err) {
		console.log('Unique Mail: ', err.message);
		return res.status(500).send({ message: 'Server Error.' });
	}
	next();
};

//================================================

module.exports.sameMail = async (req, res, next) => {
	try {
		const user = await User.find({
			mail: req.body.mail
		});
		// Mail not used
		if (!user.length) return next();
		// Mail used by the same person
		if (user[0]._id.equals(req.params.id)) return next();
		// Mail used by other person
		return res.status(400).send({ message: 'Mail already registered.' });
	} catch (err) {
		console.log('Unique Mail: ', err.message);
		return res.status(500).send({ message: 'Server Error.' });
	}
};

//================================================

module.exports.mongoId = [
	param('id')
		.exists()
		.withMessage('Id is missing.'),
	param('id')
		.isMongoId()
		.withMessage('Not a valid Mongo id.')
];

//================================================

module.exports.save = [
	body('username')
		.exists()
		.withMessage('Username is missing.'),
	body('username')
		.isString()
		.withMessage('Username must be a string.'),
	body('password')
		.not()
		.isEmpty()
		.withMessage('Password is missing.'),
	body('password')
		.isString()
		.withMessage('Password must be a string.'),
	body('name')
		.exists()
		.withMessage('Name is missing.'),
	body('name')
		.isString()
		.withMessage('Name must be a string.'),
	body('lastname')
		.exists()
		.withMessage('Lastname is missing.'),
	body('lastname')
		.isString()
		.withMessage('Lastname must be a string.'),
	body('mail')
		.exists()
		.withMessage('Mail is missing.'),
	body('mail')
		.isEmail()
		.withMessage('Mail must be valid.'),
	body('age')
		.not()
		.isString()
		.withMessage('Age must be a number.')
];

//================================================

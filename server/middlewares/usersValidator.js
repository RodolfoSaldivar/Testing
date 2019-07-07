const { body, param } = require('express-validator');

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
		.isString()
		.withMessage('Mail must be a string.'),
	body('age')
		.not()
		.isString()
		.withMessage('Age must be a number.')
];

//================================================

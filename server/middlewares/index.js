const { validationResult } = require('express-validator');
const auth = require('./auth');
const usersValidator = require('./usersValidator');

module.exports = {
	auth,
	usersValidator,
	sendValidationErrors: (req, res, next) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		return res.status(400).send({ errors: errors.array() });
	}
};

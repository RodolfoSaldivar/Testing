module.exports.isLoggedIn = (req, res, next) => {
	// console.log('req.user: ', req.user);
	// console.log('req.session: ', req.session);
	if (!req.isAuthenticated())
		return res.status(401).send({ message: 'Must authenticate first.' });
	next();
};

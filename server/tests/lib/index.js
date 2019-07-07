const mockSession = require('mock-session');
const { COOKIE_KEY } = require('../../config/keys');

module.exports.authenticate = mockSession('session', COOKIE_KEY, {
	passport: { user: '5d1cf0b63ea10749ca055c6a' }
});

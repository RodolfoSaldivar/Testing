const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { COOKIE_KEY, MONGO_URL } = require('./config/keys');

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		name: 'session',
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, the parameter must be in milliseconds
		keys: [COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./models/Users');
require('./lib/passportService');

if (app.settings.env === 'development') {
	mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useFindAndModify: false
	});
}

require('./routes/authRoutes')(app);
require('./routes/usersRoutes')(app);

app.get('/', (req, res) => {
	res.send({ message: 'Landing Page' });
});

app.listen(process.env.PORT || 5000);

module.exports = app;

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { COOKIE_KEY, MONGO_URL } = require('./config/keys');

const app = express();

// const cron = require('node-cron');
// cron.schedule('* * * * * *', function() {
// 	// 			* * * * * *
// 	// 			| | | | | |
// 	// 			| | | | | day of week
// 	// 			| | | | month
// 	// 			| | | day of month
// 	// 			| | hour
// 	// 			| minute
// 	// 			second ( optional )
// 	console.log('running a task every second');
// });

//================================================
//----> Middlewares

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

//================================================
//----> Models and services

require('./models/Users');
require('./lib/passportService');

//================================================
//----> Routes

require('./routes/authRoutes')(app);
require('./routes/usersRoutes')(app);

//================================================
//----> Configuration

if (app.settings.env === 'development') {
	mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useFindAndModify: false
	});
}

app.listen(process.env.PORT || 5000);

module.exports = app;

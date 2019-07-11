const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('users');

//================================================

passport.serializeUser((user, done) => {
   done(null, user.id);
});

//================================================

passport.deserializeUser(async (userId, done) => {
   try {
      const user = await User.getById(userId);

      if (!user[0]) {
         console.log('deserializeUser: User does not exist.');
         return done(null, false);
      }

      done(null, user[0]);
   } catch (err) {
      console.log('deserializeUser: ', err.message);
   }
});

//================================================

passport.use(
   new LocalStrategy(
      {
         usernameField: 'mail',
         passwordField: 'password'
      },
      async (mail, password, done) => {
         try {
            let user = await User.getByMail(mail);
            user = user[0];

            if (!user)
               return done(null, false, { message: 'User does not exist.' });

            const correctPassword = await bcrypt.compare(
               password,
               user.password
            );

            if (!correctPassword)
               return done(null, false, { message: 'Incorrect password.' });

            done(null, user);
         } catch (err) {
            console.log('LocalStrategy: ', err.message);
         }
      }
   )
);

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

//================================================

passport.serializeUser((user, done) => {
   done(null, user.id);
});

//================================================

passport.deserializeUser(async (userId, done) => {
   try {
      const user = await User.find({
         _id: userId
      });
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
   new LocalStrategy(async (username, password, done) => {
      try {
         let user = await User.find({
            username
         });
         user = user[0];

         if (!user)
            return done(null, false, { message: 'User does not exist.' });

         const correctPassword = await bcrypt.compare(password, user.password);

         if (!correctPassword)
            return done(null, false, { message: 'Incorrect password.' });

         done(null, user);
      } catch (err) {
         console.log('LocalStrategy: ', err.message);
      }
   })
);

const router = require('express').Router();
const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, callback){
  console.log('serializing user.');
  callback(null, user.id);
});

passport.deserializeUser(function(user, callback){
  console.log('deserialize user.');
  callback(null, user.id);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/login/google/callback',
},
function (accessToken, refreshToken, profile, cb) {
  console.log(profile);
    return cb(null, profile.id);
}
));

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

module.exports = router;

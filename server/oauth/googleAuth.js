const router = require('express').Router();
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_REDIRECT
    );

router.get('/google/', function (req, res) {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://mail.google.com/'
  });

  res.redirect(url);
});

router.get('/google/callback', function (req, res) {

  console.log(res);
  res.send('success');
});

module.exports = router;

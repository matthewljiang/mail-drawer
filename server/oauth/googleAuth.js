const router = require('express').Router();
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const db = require('../db/db.js');

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_REDIRECT
    );

router.get('/google/', function (req, res) {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://mail.google.com/'],
    approval_prompt: 'force'
  });
  res.redirect(url);
});

router.get('/google/callback/', function (req, res) {
  oauth2Client.getToken(req.query.code, function (err, tokens) {
    if (!err) {
      db.saveUserInfo(tokens.access_token, tokens.refresh_token);
      oauth2Client.setCredentials(tokens);

    }
  });
  res.send('Success');
});

module.exports = router;

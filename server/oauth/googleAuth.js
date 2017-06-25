const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_REDIRECT
    );

const scopes = [
  'https://mail.google.com/'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

module.exports = url;

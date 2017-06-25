const express = require('express');
const app = express();
const pgp = require('pg-promise');
const path = require('path'),
      indexPath = path.join(__dirname,'..','src','index.html');
      distPath = path.join(__dirname,'..','dist');

const api = require('./api/api.js');
const googleAuth = require('./oauth/googleAuth.js');

app.use(express.static(distPath));

app.use('/api', api);

app.use('/auth', googleAuth);

app.get('/', function (req, res) {
  res.sendFile(indexPath);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

const express = require('express'),
      app = express();

// Link to webpack bundle
const path = require('path'),
      indexPath = path.join(__dirname,'..','src','index.html');
distPath = path.join(__dirname,'..','dist');
app.use(express.static(distPath));

// Initialize Passport
app.use(require('passport').initialize());

// Set up DynamoDB session storage
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')({session: session});
app.use(session({store: new DynamoDBStore({
  AWSConfigPath: '~/.aws/credentials'
}), secret: 'gonnareplacethis'}));

// Configure routes
app.use('/api', require('./api/api.js'));
app.use('/login', require('./login/login.js'));
app.use('/auth', require('./oauth/googleAuth.js'));

// Set start path
app.get('/', function (req, res) {
  res.sendFile(indexPath);
});

// Start the application
app.listen(8080, function () {
  console.log('Application listening on port 8080')
});

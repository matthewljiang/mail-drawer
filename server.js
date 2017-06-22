const express = require('express');
const app = express();
const path = require('path'),
      indexPath = path.join(__dirname,'src','index.html');
      distPath = path.join(__dirname,'dist');

app.use(express.static(distPath));
app.get('/', function (req, res) {
  res.sendFile(indexPath);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


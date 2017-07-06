const db = require('../db/db.js');
const router = require('express').Router();

router.get('/test', function (req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({a: 1}));
});

module.exports = router;

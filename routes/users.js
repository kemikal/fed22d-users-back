var express = require('express');
var router = express.Router();

let users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Bob'},
  {id: 4, name: 'Alice'}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

router.get('/test', function(req, res, next) {
  res.send('test routen');
});

module.exports = router;

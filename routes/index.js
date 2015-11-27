var express = require('express');
var slug = require('slug');
var router = express.Router();

/* GET Home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Listodo' });
});

module.exports = router;

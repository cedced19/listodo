var express = require('express');
var router = express.Router();
var pkg = require('../package.json');
var checkUpdate = require('check-update');

/* GET Version */
router.get('/', function(req, res, next) {
    checkUpdate({packageName: pkg.name}, function(err, latestVersion){
      if(err) return next(err);
      res.json({
          local: pkg.version,
          github: latestVersion,
          url: pkg.homepage + '/releases/latest'
      });
    });
});

module.exports = router;

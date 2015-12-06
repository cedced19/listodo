var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var pkg = require('../package.json');
var got = require('got');
var semver = require('semver');

/* GET Version */
router.get('/', function(req, res, next) {
    got('https://raw.githubusercontent.com/cedced19/listodo/master/package.json', function (err, data) {
        if(err) return next(err);
        data = JSON.parse(data);
        res.json({
            local: pkg.version,
            github: data.version,
            url: 'https://github.com/cedced19/listodo/releases/latest'
        });
    });
});

module.exports = router;

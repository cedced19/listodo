var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var pkg = require('../package.json');
var got = require('got');
var semver = require('semver');

/* GET Version */
router.get('/', function(req, res) {
    got('https://raw.githubusercontent.com/cedced19/listodo/master/package.json', function (err, data) {
        if(err) return res.status(500).json({err: 500});
        data = JSON.parse(data);
        if (semver.gte(pkg.version, data.version)) {
            res.json({
                local: pkg.version,
                github: data.version,
                status: 'You have the latest version.'
            });
        } else if (semver.lt(pkg.version, data.version)) {
            res.json({
                local: pkg.version,
                github: data.version,
                status: 'You can update. <a href="https://github.com/cedced19/listodo/releases/latest">Learn more</a>.'
            });
        }
    });
});

module.exports = router;

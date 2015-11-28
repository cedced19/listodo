var stylus = require('stylus');
var nib = require('nib');

var compile = {
  development: function (str, path) {
    return stylus(str)
     .set('filename', path)
     .set('compress', false)
     .use(nib());
  },
  production: function (str, path) {
    return stylus(str)
     .set('filename', path)
     .set('compress', true)
     .use(nib());
  }
};

module.exports = compile;

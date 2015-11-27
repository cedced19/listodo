var Waterline = require('Waterline');
var hash = require('password-hash-and-salt');

var format = function(user, cb) {
    user.name = user.name.charAt(0).toUpperCase() + user.name.substring(1).toLowerCase();
    if (user.password) {
        hash(user.password).hash(function(err, crypted) {
          user.password = crypted;
          cb();
        });
    } else {
      cb();
    }
};

var Users = Waterline.Collection.extend({
    identity: 'users',
    connection: 'save',
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        }
    },

    beforeCreate: format,
    beforeUpdate: format
});

module.exports = Users;

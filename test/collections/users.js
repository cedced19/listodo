var assert = require('assert');
var Waterline = require('waterline');
var memoryAdapter = require('sails-memory');

suite('Test users model', function () {
    var waterline = new Waterline();
    var config = {
        adapters: {
            'default': memoryAdapter,
            memory: memoryAdapter
        },
        connections: {
            save: {
                adapter: 'memory'
            }
        },
        defaults: {
            migrate: 'safe'
        }
    }


    setup(function (done) {
        waterline.loadCollection(require('../../models/users.js'));
        waterline.initialize(config, function  (err, ontology) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    teardown(function () {
        var adapters = config.adapters || {};
        var promises = [];

        Object.keys(adapters)
            .forEach(function (adapter) {
                if (adapters[adapter].teardown) {
                    var promise = new Promise(function (resolve) {
                        adapters[adapter].teardown(null, resolve);
                    });
                    promises.push(promise);
                }
            });

        return Promise.all(promises);
    });

    test('should be able to create a user', function () {
        var Users = waterline.collections.users;

            return Users.create({
                email: 'cedced19@gmail.com',
                password: '123456'
            })
            .then(function (user) {
                assert.equal(user.email, 'cedced19@gmail.com', 'should have set the email');
                assert.notEqual(user.password, '123456', 'should have hash the password');
            });
    });
});
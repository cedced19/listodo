var assert = require('assert');
var Waterline = require('waterline');
var memoryAdapter = require('sails-memory');

suite('Test models', function () {
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
    };


    setup(function (done) {
        waterline.loadCollection(require('../models/users.js'));
        waterline.loadCollection(require('../models/registrants.js'));
        waterline.loadCollection(require('../models/tasks.js'));
        waterline.loadCollection(require('../models/lists.js'));
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

    test('should be able to create a registrant', function () {
        var Registrants = waterline.collections.registrants;

            return Registrants.create({
                email: 'cedced19@gmail.com',
                password: '123456'
            })
            .then(function (registrant) {
                assert.equal(registrant.email, 'cedced19@gmail.com', 'should have set the email');
                assert.equal(registrant.password, '123456', 'should haven\'t hash the password');
            });
    });

    test('should be able to create a task and link it to a list', function (done) {
        var Lists = waterline.collections.lists;
        var Tasks = waterline.collections.tasks;

        Lists.create({
            name: 'Homework'
        })
        .then(function (list) {
            assert.equal(list.name, 'Homework', 'should have set the name');
            assert.equal(list.tasks.length, 0, 'should have no tasks');
            Tasks.create({
                name: 'Maths',
                list: 1,
                content: 'Do my exercise'
            }).then(function(task) {
                assert.equal(task.name, 'Maths', 'should have set the name');
                assert.equal(task.content, 'Do my exercise', 'should have set the content');
                Tasks.find()
                .populate('list')
                .exec(function(err, task) {
                    if (err) throw err;
                    assert.equal(task[0].list.name, 'Homework', 'should have linked to a list');
                    done();
                });
            });
        });
    });
});
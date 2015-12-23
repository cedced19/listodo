var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

/* GET Lists */
router.get('/', function(req, res, next) {
    req.app.models.lists.find().populate('tasks').exec(function(err, models) {
        if(err) return next(err);
        models.forEach(function (list) {
            list.tasks.forEach(function (task) {
               delete task.list;
            });
        });
        res.json(models);
    });
});

/* POST Lists: create a task */
router.post('/', auth, function(req, res, next) {
    req.app.models.lists.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json(model);
    });
});

/* GET Task */
router.get('/:id', function(req, res, next) {
    req.app.models.lists.find({ id: req.params.id }).populate('tasks').exec(function(err, model) {
        if(err) return next(err);
        model = model[0];
        if(model === '' || model === null || model === undefined) return next(err);
        res.json(model);
    });
});

/* DELETE Task */
router.delete('/:id', auth, function(req, res, next) {
    req.app.models.lists.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

/* PUT Task */
router.put('/:id', auth, function(req, res, next) {
    delete req.body.id;
    req.app.models.lists.update({ id: req.params.id }, req.body, function(err, model) {
        if(err) return next(err);
        res.json(model[0]);
    });
});

module.exports = router;

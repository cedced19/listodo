var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

router.post('/', auth, function(req, res, next) {
  req.body.listsToPublish.forEach(function (list) {
    req.app.models.lists.create({
      name: list.name
      }, function(err, model) {
        if(err) return next(err);
        list.tasks.forEach(function (task) {
          req.app.models.tasks.create({
            name: task.name,
            content: task.content,
            list: model.id,
            createdAt: task.createdAt
          });
        });
      });
    });
    req.body.tasksToRemove.forEach(function (task) {
      req.app.models.tasks.find().populate('list').exec(function(err, models) {
          if(err) return next(err);
          models.forEach(function (localTask) {
            if (localTask.name == task.name && localTask.list.name == task.list) {
              req.app.models.tasks.destroy({ id: localTask.id }, function(err) {
                  if(err) return next(err);
              });
            }
          });
      });
    });
    req.body.tasksToPublish.forEach(function (task) {
        req.app.models.tasks.create(task, function(err) {
          if(err) return next(err);
        });
    });
    req.body.tasksToUpdate.forEach(function (task) {
      req.app.models.tasks.update({ id: task.id }, {
        name: task.name,
        content: task.content
      }, function(err, model) {
          if(err) return next(err);
      });
    });
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

module.exports = router;

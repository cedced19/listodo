module.exports = ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'notie', '$translate', function($scope, $location, $http, $routeParams, $rootScope, notie, $translate) {

        $http.get('/api/tasks/' + $routeParams.id).success(function (data) {
            $scope.currentTask = data;
        }).error(function () {
            notie.alert(3, 'This task does not exist anymore.', 3);
            $location.path('/');
        });

        $scope.updateTask = function () {
            $rootScope.$login(function () {
              $http.put('/api/tasks/' + $scope.currentTask.id,  {
                      name: $scope.currentTask.name,
                      content: $scope.currentTask.content
              }).success(function (data) {
                      $translate('task_updated').then(function (translation) {
                        notie.alert(1, translation, 3);
                      });
                      $scope.editing = false;
              }).error($rootScope.$error);
            });
        };

        $scope.deleteTask = function () {
          $rootScope.$login(function () {
                $translate(['delete_it', 'delete_task_question', 'task_deleted', 'cancel']).then(function (translations) {
                  notie.confirm(translations['delete_task_question'], translations['delete_it'], translations['cancel'], function() {
                      $http.delete('/api/tasks/' + $scope.currentTask.id).success(function() {
                          notie.alert(1, translations['task_deleted'], 3);
                          $location.path('/');
                      }).error($rootScope.$error);
                  });
                });
              });
        }
}];

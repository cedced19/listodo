module.exports = ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'notie', function($scope, $location, $http, $routeParams, $rootScope, notie) {
        $rootScope.nav = '';

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
                      notie.alert(1, 'The task has been updated.', 3);
                      $scope.editing = false;
              }).error($rootScope.$error);
            });
        };

        $scope.deleteTask = function () {
            $rootScope.$login(function () {
              notie.confirm('Delete this task?', 'Yes, delete it!', 'Cancel', function() {
                  $http.delete('/api/tasks/'+ $scope.currentTask.id).success(function() {
                      notie.alert(1, 'Deleted! The task has been deleted.', 3);
                      $location.path('/');
                  }).error($rootScope.$error);
              });
            });
        }
}];

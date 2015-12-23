module.exports = ['$scope', '$location', '$http', '$routeParams', '$rootScope', 'sweet', function($scope, $location, $http, $routeParams, $rootScope, sweet) {
        $rootScope.nav = '';

        $http.get('/api/tasks/' + $routeParams.id).success(function (data) {
            $scope.currentTask = data;
        }).error(function () {
            sweet.show('Oops...', 'This task does not exist anymore.', 'error');
            $location.path('/');
        });

        $scope.updateTask = function () {
            $http.put('/api/tasks/' + $scope.currentTask.id,  {
                    name: $scope.currentTask.name,
                    content: $scope.currentTask.content
            }).success(function (data) {
                    sweet.show('The task has been updated.', '', 'success');
                    $scope.editing = false;
            }).error(function() {
                    sweet.show('Oops...', 'Something went wrong!', 'error');
            });
        };

        $scope.deleteTask = function () {
            sweet.show({
                title: 'Confirm',
                text: 'Delete this task?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false
            }, function() {
                $http.delete('/api/tasks/'+ $scope.currentTask.id).success(function() {
                    sweet.show('Deleted!', 'The lesson has been deleted.', 'success');
                    $location.path('/');
                }).error(function() {
                    sweet.show('Oops...', 'Something went wrong!', 'error');
                });
            });
        }
}];
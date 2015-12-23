module.exports = ['$scope', '$location', '$http', '$rootScope', 'sweet', function($scope, $location, $http, $rootScope, sweet) {
        $rootScope.nav = 'tasks';

        $http.get('/api/tasks').success(function (data) {
                $scope.tasks = data;
        }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
        });

        $scope.goTask = function (task) {
            $location.path('/tasks/' + task.id);
        };
}];
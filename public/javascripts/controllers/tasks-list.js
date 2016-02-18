module.exports = ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {
        $rootScope.nav = 'tasks';

        $http.get('/api/tasks').success(function (data) {
                $scope.tasks = data;
        }).error($rootScope.$error);

        $scope.goTask = function (task) {
            $location.path('/tasks/' + task.id);
        };
}];

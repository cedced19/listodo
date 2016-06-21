module.exports = ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {

        $http.get('/api/lists').success(function (data) {
                $scope.lists = data;
        }).error($rootScope.$error);

        $scope.goTask = function (task) {
            $location.path('/tasks/' + task.id);
        };
}];

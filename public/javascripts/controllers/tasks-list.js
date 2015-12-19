module.exports = ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'tasks';

        $rootScope.user = $cookieStore.get('listodo-user');
        
        $http.get('/api/tasks').success(function (data) {
                $scope.tasks = data;
        }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
        });
        
        $scope.goTask = function (task) {
            $location.path('/tasks/' + task.id);
        };
}];
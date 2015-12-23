module.exports = ['$scope', '$location', '$http', '$rootScope', 'sweet', '$cookieStore', function($scope, $location, $http, $rootScope, sweet, $cookieStore) {
        $rootScope.nav = 'login';

        $rootScope.user = $cookieStore.get('listodo-user');
        if ($rootScope.user) {
            $location.path('/');
        }

        $scope.login = function () {
            $http.post('/login', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data) {
                $rootScope.user = data;
                $location.path('/')
            }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
            });
        };
}];
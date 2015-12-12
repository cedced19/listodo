module.exports = ['$scope', '$location', '$http', '$rootScope', 'sweet', function($scope, $location, $http, $rootScope, sweet) {
        $rootScope.nav = 'login';
        
        $http.get('/api/version').success(function (data) {
                if (require('semver').lt(data.local, data.github)) {
                        $scope.update = data.url;
                }
        });
   
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
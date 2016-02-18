module.exports = ['$scope', '$location', '$http', '$rootScope', 'notie', function($scope, $location, $http, $rootScope, notie) {
        $rootScope.nav = '';

        if ($rootScope.user) {
            $location.path('/');
        }

        $scope.signup = function () {
            $http.post('/api/registrants', {
                email: $scope.email,
                password: $scope.password
            }).success(function() {
                $location.path('/');
                notie.alert(1, 'You have been registered.', 3);
            }).error($rootScope.$error);
        };
}];

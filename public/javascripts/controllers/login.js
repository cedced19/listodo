module.exports = ['$scope', '$location', '$http', '$rootScope', '$translate', 'notie', function($scope, $location, $http, $rootScope, $translate, notie) {

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
            }).error(function (data, code) {
              if (code === 401) {
                $translate('invalid_auth').then(function (translation) {
                  notie.alert(3, translation, 3);
                });
              } else {
                $rootScope.$error();
              }
            });
        };
}];

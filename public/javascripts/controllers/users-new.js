module.exports = ['$scope', '$location', '$http', '$rootScope', 'notie', '$translate', function($scope, $location, $http, $rootScope, notie, $translate) {

      if (!$rootScope.user) {
        $location.path('/');
      }

      $scope.createUser = function() {
          $http.post('/api/users', {
              email: $scope.email,
              password: $scope.password
          }).success(function(data) {
              $translate('user_saved').then(function (message) {
                notie.alert(1, message, 3);
              });
              $location.path('/users/' + data.id.toString());
          }).error($rootScope.$error);
      };
}];

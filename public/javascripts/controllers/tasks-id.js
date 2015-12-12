module.exports = ['$scope', '$location', '$http', '$routeParams', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $routeParams, $rootScope,  $cookieStore, sweet) {
        $rootScope.nav = '';

        $rootScope.user = $cookieStore.get('listodo-user');

}];
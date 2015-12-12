module.exports = ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'tasks';

        $rootScope.user = $cookieStore.get('listodo-user');
        
}];
module.exports = ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'creation';
        
        $rootScope.user = $cookieStore.get('listodo-user');
        
        
        
        $scope.newTask = {};
        $scope.list = '';
        

        $scope.displayTask = function() {
        };
}];
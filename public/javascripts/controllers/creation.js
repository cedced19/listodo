module.exports = ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'creation';
        
        $rootScope.user = $cookieStore.get('listodo-user');
        
        
        $http.get('/api/lists').success(function (data) {
                if (data.length === 0) {
                        $scope.lists = false;   
                } else {
                        $scope.lists = data;
                };
        });
        
        $scope.newList = {};
        $scope.displayList = function() {
                $http.post('/api/lists',  {
                        name: $scope.newList.name
                }).success(function (data) {
                        if (!Array.isArray($scope.lists)) {
                                $scope.lists = [];
                        }
                        $scope.newList = {};
                        $scope.lists.push(data);
                });
        };
        
        $scope.newTask = {};
        $scope.displayTask = function() {
        };
        
}];
module.exports = ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'creation';
        
        $rootScope.user = $cookieStore.get('listodo-user');
        
        
        $http.get('/api/lists').success(function (data) {
                $scope.lists = data;
        }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
        });
        
        $scope.newList = {};
        $scope.displayList = function() {
                $http.post('/api/lists',  {
                        name: $scope.newList.name
                }).success(function (data) {
                        $scope.newList = {};
                        $scope.lists.push(data);
                        sweet.show('The list has been created.', '', 'success');
                }).error(function() {
                        sweet.show('Oops...', 'Something went wrong!', 'error');
                });
        };
        
        $scope.newTask = {};
        $scope.displayTask = function() {
                $http.post('/api/tasks',  {
                        name: $scope.newTask.name,
                        list: $scope.newTask.list.id,
                        content: $scope.newTask.content
                }).success(function (data) {
                        $location.path('/tasks/' + data.id)
                        sweet.show('The task has been created.', '', 'success');
                }).error(function() {
                        sweet.show('Oops...', 'Something went wrong!', 'error');
                });
        };
        
}];
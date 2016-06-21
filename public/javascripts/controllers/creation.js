module.exports = ['$scope', '$location', '$http', '$rootScope', 'notie', function($scope, $location, $http, $rootScope, notie) {

        if (!$rootScope.user) {
          $location.path('/');
        }

        $http.get('/api/lists').success(function (data) {
                $scope.lists = data;
        }).error($rootScope.$error);

        $scope.newList = {};
        $scope.displayList = function() {
                $http.post('/api/lists',  {
                        name: $scope.newList.name
                }).success(function (data) {
                        $scope.newList = {};
                        $scope.lists.push(data);
                        notie.alert(1, 'The list has been created.', 3);
                }).error($rootScope.$error);
        };

        $scope.newTask = {};
        $scope.displayTask = function() {
                $http.post('/api/tasks',  {
                        name: $scope.newTask.name,
                        list: $scope.newTask.list.id,
                        content: $scope.newTask.content
                }).success(function (data) {
                        $location.path('/tasks/' + data.id);
                        notie.alert(1, 'The task has been created.', 3);
                }).error($rootScope.$error);
        };

}];

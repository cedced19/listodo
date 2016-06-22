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
                        $translate('list_saved').then(function (translation) {
                          notie.alert(1, translation, 3);
                        });
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
                        $translate('task_saved').then(function (translation) {
                          notie.alert(1, translation, 3);
                        });
                }).error($rootScope.$error);
        };

}];

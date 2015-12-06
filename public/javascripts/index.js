require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('angular-cookies');
require('./alert/sweet-alert.js');
require('./alert/ng-sweet-alert.js');

angular.module('Listodo', ['hSweetAlert', 'ngSanitize', 'ngRoute', 'ngTouch', 'ngCookies'])
.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: '/views/task-list.html',
            controller: 'ListodoTaskListCtrl'
        })
        .when('/tasks/new', {
            templateUrl: '/views/task-new.html',
            controller: 'ListodoTaskNewCtrl'
        })
        .when('/tasks/:id', {
            templateUrl: '/views/task-id.html',
            controller: 'ListodoTaskIdCtrl'
        })
        .when('/users', {
            templateUrl: '/views/users-list.html',
            controller: 'ListodoUsersListCtrl'
        })
        .when('/users/new', {
            templateUrl: '/views/users-new.html',
            controller: 'ListodoUsersNewCtrl'
        })
        .when('/users/:id', {
            templateUrl: '/views/users-id.html',
            controller: 'ListodoUsersIdCtrl'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'ListodoLoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]).run(['$rootScope', '$location', function($rootScope, $location){
        $rootScope.$menu = {
            show: function () {
                     document.getElementsByTagName('body')[0].classList.add('with-sidebar');
            },
            hide: function (path) {
                    document.getElementsByTagName('body')[0].classList.remove('with-sidebar');
                    if (path) {
                        $location.path(path);
                    }
            }
        };
}]).controller('ListodoTaskListCtrl', ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'tasks';

        $rootScope.user = $cookieStore.get('listodo-user');
        
}]).controller('ListodoTaskIdCtrl', ['$scope', '$location', '$http', '$routeParams', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $routeParams, $rootScope,  $cookieStore, sweet) {
        $rootScope.nav = '';

        $rootScope.user = $cookieStore.get('listodo-user');

}]).controller('ListodoTaskNewCtrl', ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'creation';

        $rootScope.user = $cookieStore.get('listodo-user');

        $scope.newTask = {};
        $scope.list = '';
        

        $scope.displayTask = function() {
        };
}]).controller('ListodoUsersListCtrl', ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = 'users';

        $rootScope.user = $cookieStore.get('listodo-user');

        $http.get('/api/users').success(function(data) {
            $scope.users = data;

            $scope.createUser = function () {
                $location.path('/users/new');
            };

            $scope.updateUser = function (user) {
                $location.path('/users/' +user.id);
            };

            $scope.deleteUser = function (user) {
                if (user.id == $scope.user.id) {
                    sweet.show('Oops...', 'You can\'t delete yourself!', 'error');
                } else {
                    sweet.show({
                        title: 'Confirm',
                        text: 'Delete this user?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Yes, delete it!',
                        closeOnConfirm: false
                    }, function() {
                        $http.delete('/api/users/'+user.id).success(function() {
                            sweet.show('Deleted!', 'The task has been deleted.', 'success');
                            $location.path('/');
                        }).error(function() {
                            sweet.show('Oops...', 'Something went wrong!', 'error');
                        });
                    });
                }
            };
        }).error(function() {
            sweet.show('Oops...', 'Something went wrong!', 'error');
        });
}]).controller('ListodoUsersIdCtrl', ['$routeParams', '$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($routeParams, $scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = '';

        $rootScope.user = $cookieStore.get('listodo-user');

        if ($rootScope.user.id == $routeParams.id) {
            $scope.name = $rootScope.user.name;
        } else {
            $http.get('/api/users/' + $routeParams.id).success(function(data) {
                $scope.name = data.name;
            }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
            });
        }

        $scope.updateUser = function () {
                $http.put('/api/users/' + $routeParams.id, {
                    email: $scope.email,
                    password: $scope.password
                }).success(function(data) {
                    sweet.show('The user has been updated.', '', 'success');
                    $location.path('/users/' + data.id.toString());
                }).error(function() {
                    sweet.show('Oops...', 'Something went wrong!', 'error');
                });
        };
}]).controller('ListodoUsersNewCtrl', ['$scope', '$location', '$http', '$rootScope', '$cookieStore', 'sweet', function($scope, $location, $http, $rootScope, $cookieStore, sweet) {
        $rootScope.nav = '';

        $rootScope.user = $cookieStore.get('listodo-user');

        $scope.createUser = function() {
            $http.post('/api/users', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data) {
                sweet.show('The user has been saved.', '', 'success');
                $location.path('/users/' + data.id.toString());
            }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
            });
        };
}]).controller('ListodoLoginCtrl', ['$scope', '$location', '$http', '$rootScope', 'sweet', function($scope, $location, $http, $rootScope, sweet) {
        $rootScope.nav = 'login';
        
        $http.get('/api/version').success(function (data) {
                if (require('semver').lt(data.local, data.github)) {
                        $scope.update = data.url;
                }
        });
   
        $scope.login = function () {
            $http.post('/login', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data) {
                $rootScope.user = data;
                $location.path('/')
            }).error(function() {
                sweet.show('Oops...', 'Something went wrong!', 'error');
            });
        };
}]);

require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('ng-notie');

var app = angular.module('Listodo', ['ngNotie', 'ngSanitize', 'ngRoute', 'ngTouch']);

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/views/tasks-list.html',
            controller: 'ListodoTasksListCtrl'
        })
        .when('/creation', {
            templateUrl: '/views/creation.html',
            controller: 'ListodoCreationCtrl'
        })
        .when('/tasks/:id', {
            templateUrl: '/views/tasks-id.html',
            controller: 'ListodoTasksIdCtrl'
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
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'ListodoSignupCtrl'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'ListodoLoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', '$location', '$http', 'notie', function ($rootScope, $location, $http, notie) {
        $rootScope.$menu = {
            show: function () {
              document.getElementsByTagName('body')[0].classList.add('with-sidebar');
            },
            hide: function (path) {
              document.getElementsByTagName('body')[0].classList.remove('with-sidebar');
              if (path) {
                $location.path(path);
              }
            },
            logout: function () {
              $http.get('/logout').success(function () {
                $rootScope.user = false;
                $location.path('/');
              });
            }
        };
        $http.get('/authenticated').success(function (data) {
          if (data.status) {
              $rootScope.user = data.user;
          } else {
              $rootScope.user = false;
          }
        });
        $rootScope.$error = function () {
          notie.alert(3, 'Something went wrong!', 3);
          if ($rootScope.user) {
            $http.get('/authenticated').success(function (data) {
              if (!data.status) {
                  $rootScope.user = false;
              }
            });
          }
        };
        $rootScope.$login = function (cb) {
          if (!$rootScope.user) {
            notie.input('You must authenticate to do that', 'Continue', 'Cancel', 'text', 'Name', function (name) {
              notie.input('You must authenticate to do that', 'Login', 'Cancel', 'password', 'Password', function (password) {
                $http.post('/login', {
                    name: name,
                    password: password
                }).success(function(data) {
                    $rootScope.user = data;
                    cb();
                }).error(function () {
                    notie.alert(3, 'Invalid name or password.', 3);
                });
              });
            });
          } else {
            cb();
          }
        };
}]);

app.controller('ListodoTasksListCtrl', require('./controllers/tasks-list'))
app.controller('ListodoTasksIdCtrl', require('./controllers/tasks-id'));
app.controller('ListodoCreationCtrl', require('./controllers/creation'));
app.controller('ListodoUsersListCtrl', require('./controllers/users-list'))
app.controller('ListodoUsersIdCtrl', require('./controllers/users-id'));
app.controller('ListodoUsersNewCtrl', require('./controllers/users-new'));
app.controller('ListodoSignupCtrl', require('./controllers/signup'));
app.controller('ListodoLoginCtrl', require('./controllers/login'));

require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('angular-cookies');
require('./alert/sweet-alert.js');
require('./alert/ng-sweet-alert.js');

var app = angular.module('Listodo', ['hSweetAlert', 'ngSanitize', 'ngRoute', 'ngTouch', 'ngCookies']);

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

app.run(['$rootScope', '$location', function($rootScope, $location) {
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
}]);

app.controller('ListodoTasksListCtrl', require('./controllers/tasks-list'))
app.controller('ListodoTasksIdCtrl', require('./controllers/tasks-id'));
app.controller('ListodoCreationCtrl', require('./controllers/creation'));
app.controller('ListodoUsersListCtrl', require('./controllers/users-list'))
app.controller('ListodoUsersIdCtrl', require('./controllers/users-id'));
app.controller('ListodoUsersNewCtrl', require('./controllers/users-new'));
app.controller('ListodoSignupCtrl', require('./controllers/signup'));
app.controller('ListodoLoginCtrl', require('./controllers/login'));

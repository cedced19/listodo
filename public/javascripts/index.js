require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('ng-notie');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-loader-url');
require('angular-local-storage');


var app = angular.module('Listodo', ['ngNotie', 'ngSanitize', 'ngRoute', 'ngTouch', 'LocalStorageModule', 'pascalprecht.translate']);

app.config(['$routeProvider', '$translateProvider', 'localStorageServiceProvider',  function($routeProvider, $translateProvider, localStorageServiceProvider) {
        // Route configuration
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
        .when('/languages', {
            templateUrl: '/views/languages.html',
            controller: 'ListodoLanguagesCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        // Localstorage configuration
        localStorageServiceProvider.setPrefix('learn-memory');

        // i18n configuration
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/langs/locale-',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['en', 'fr'], {
          'fr_*': 'fr',
          'en_*': 'en',
          '*': 'en'
        })
        .useSanitizeValueStrategy(null)
        .determinePreferredLanguage()
        .fallbackLanguage('en');
}]);

app.run(['$rootScope', '$location', '$http', 'notie', '$translate', 'localStorageService', function ($rootScope, $location, $http, notie, $translate, localStorageService) {
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

        $rootScope.$on('$routeChangeSuccess', function(event, next, current) { // Close menu
          $rootScope.nav = $location.path();
        });

        $http.get('/authenticated').success(function (data) {
          if (data.status) {
              $rootScope.user = data.user;
          } else {
              $rootScope.user = false;
          }
        });

        $rootScope.$error = function () { // Send message error
          $http.get('/authenticated').success(function (data) {
            if (!data.status) {
                $rootScope.user = false;
            }
            $translate('error_occured').then(function (error) {
              notie.alert(3, error , 3);
            });

          }).error(function () {
            $translate('http_error').then(function (error) {
              notie.alert(3, error, 3);
            });
          });
        };


        $rootScope.$login = function (cb) { // Login before error
          $http.get('/authenticated').success(function (data) {
            if (!data.status) {

              $translate(['authenticate_title', 'login', 'continue', 'cancel', 'email', 'password', 'invalid_auth']).then(function (translations) {

                notie.input(translations['authenticate_title'], translations['continue'], translations['cancel'], 'text', translations['email'], function (email) {
                  notie.input(translations['authenticate_title'], translations['login'], translations['cancel'], 'password', translations['password'], function (password) {
                    $http.post('/login', {
                        email: email,
                        password: password
                    }).success(function(data) {
                        $rootScope.user = data;
                        cb();
                    }).error(function () {
                        notie.alert(3, translations['invalid_auth'], 3);
                    });
                  });
                });

              });
            } else {
              cb();
            }
          });
        };

        var lang = localStorageService.get('lang');
        if (lang) {
          $translate.use(lang);
        }
}]);

app.controller('ListodoTasksListCtrl', require('./controllers/tasks-list'))
app.controller('ListodoTasksIdCtrl', require('./controllers/tasks-id'));
app.controller('ListodoCreationCtrl', require('./controllers/creation'));
app.controller('ListodoUsersListCtrl', require('./controllers/users-list'))
app.controller('ListodoUsersIdCtrl', require('./controllers/users-id'));
app.controller('ListodoUsersNewCtrl', require('./controllers/users-new'));
app.controller('ListodoSignupCtrl', require('./controllers/signup'));
app.controller('ListodoLoginCtrl', require('./controllers/login'));
app.controller('ListodoLanguagesCtrl', require('./controllers/languages.js'));

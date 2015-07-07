'use strict';

angular.module('myApp.login', ['ngRoute', 'myApp.login.service'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope', 'loginService', function($scope, loginService) {
    //$scope.validateUser=loginService.validateUser;
    $scope.validateUser = function(user) {
        loginService.validateUser(user);
    }
}]);

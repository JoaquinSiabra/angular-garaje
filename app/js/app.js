'use strict';

/* App Module */

var garajeApp = angular.module('garajeApp', [
  'ngRoute',
  'garajeAnimations',
  'garajeControllers',
  'garajeFilters',
  'garajeServices',
  'garajeDirectives'
]); 

garajeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/proyectos', {
        templateUrl: 'partials/proyecto-list.html',
        controller: 'ProyectoListCtrl'
      }).
	  when('/proyectos/new', {
        templateUrl: 'partials/proyecto-detail.html',
        controller: 'ProyectoNewCtrl'
      }).
      when('/proyectos/:proyectoId', {
        templateUrl: 'partials/proyecto-detail.html',
        controller: 'ProyectoDetailCtrl'
      }).
	  when('/users', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
      }).
	  when('/users/new', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserNewCtrl'
      }).
	   when('/users/:userId', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/proyectos'
      });
  }]);

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


//_------------------------

garajeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
	  when('/portada', {
        templateUrl: 'partials/portada.html',
        controller: 'LoginCtrl'
      }).
	  when('/bye', {
        templateUrl: 'partials/despedida.html'
      }).
	  when('/login', {
        templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
      }).
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
	  when('/users/area', {
        templateUrl: 'partials/user-area.html',
        controller: 'UserAreaCtrl'
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
        redirectTo: '/portada'
      });
  }]);

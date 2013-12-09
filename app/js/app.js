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
        controller: 'SesionCtrl'
      }).
	  /*when('/bye', {
        templateUrl: 'partials/despedida.html'
      }).*/
	 /* when('/login', {
        templateUrl: 'partials/login.html',
		controller: 'SesionCtrl'
      }).*/
      when('/proyectos', {
        templateUrl: 'partials/proyecto-list.html',
        controller: 'ProyectoListCtrl'
      }).
	  when('/proyecto/new', {
        templateUrl: 'partials/proyecto-detail.html',
        controller: 'ProyectoNewCtrl'
      }).
      when('/proyecto/:proyectoId', {
        templateUrl: 'partials/proyecto-detail.html',
        controller: 'ProyectoDetailCtrl'
      }).
	  when('/users', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
      }).
	  when('/user/area', {
        templateUrl: 'partials/user-area.html',
        controller: 'UserAreaCtrl'
      }).
	  when('/user/new', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserNewCtrl'
      }).
	   when('/user/:userId', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
	  when('/user/:userId/proyectos', {
        templateUrl: 'partials/proyecto-list.html',
        controller: 'UserProyectosCtrl'
      }).
	  when('/user/:userId/colaboraciones', {
        templateUrl: 'partials/proyecto-list.html',
        controller: 'UserColaboracionesCtrl'
      }).
      otherwise({
        redirectTo: '/portada'
      });
  }]);

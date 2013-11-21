'use strict';

/* App Module */

var garajeApp = angular.module('garajeApp', [
  'ngRoute',
  'garajeAnimations',
  'garajeControllers',
  'garajeFilters',
  'garajeServices'
]); 

garajeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/proyectos', {
        templateUrl: 'partials/proyecto-list.html',
        controller: 'ProyectoListCtrl'
      }).
      when('/proyectos/:proyectoId', {
        templateUrl: 'partials/proyecto-detail.html',
        controller: 'ProyectoDetailCtrl'
      }).
      otherwise({
        redirectTo: '/proyectos'
      });
  }]);

'use strict';

/* Services */

var garajeServices = angular.module('garajeServices', ['ngResource']);

/*phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/index.php/proyectos');
  }]);*/
  
  
garajeServices.factory('Proyectos', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/index.php/proyectos', {},
					{query: {method:'GET', isArray:true}});
  }]);

  garajeServices.factory('Images', ['$resource',
  function($resource){  
    return $resource('http://localhost/garaje/api/index.php/imagenes/:proyectoId', {},
					{query: {method:'GET', isArray:true}});
  }]);
  
garajeServices.factory('Proyecto', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/index.php/proyectos/:proyectoId', {}, {
      query: {method:'GET', isArray: false},
	  create: {method:'POST'},
      update: {method:'PUT', params: {proyectoId: '@proyectoId'}},
      remove: {method:'DELETE', params: {proyectoId: '@proyectoId'}}
    });
  }]);


'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

/*phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/index.php/proyectos');
  }]);*/
  
  
phonecatServices.factory('Proyectos', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/index.php/proyectos',
					{query: {method:'GET', isArray:true}});
  }]);

  phonecatServices.factory('Images', ['$resource',
  function($resource){  
    return $resource('http://localhost/garaje/api/index.php/imagenes/:proyectoId',
					{query: {method:'GET', isArray:true}});
  }]);
  
phonecatServices.factory('Proyecto', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/index.php/proyectos/:proyectoId', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);


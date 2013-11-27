'use strict';

var garajeServices = angular.module('garajeServices', ['ngResource']);
  
garajeServices.factory('Proyectos', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/proyectoAPI.php/proyectos', {},
					{query: {method:'GET', isArray:true}});
  }]);
  
garajeServices.factory('Proyecto', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/proyectoAPI.php/proyectos/:proyectoId', {}, {
      query: {method:'GET', isArray: false},
	  create: {method:'POST',data: '@proyecto'},
      update: {method:'PUT', params: {proyectoId: '@proyectoId'}},
      remove: {method:'DELETE', params: {proyectoId: '@proyectoId'}}
    });
  }]);
  
  
  garajeServices.factory('Images', ['$resource',
  function($resource){  
    return $resource('http://localhost/garaje/api/proyectoAPI.php/imagenes/:proyectoId', {},
					{query: {method:'GET', isArray:true}});
  }]);
  
  garajeServices.factory('Image', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/proyectoAPI.php/imagenes', {}, {
	  create: {method:'POST', data: '@proyecto'},
    });
  }]);
    
  
  //--------------------------------------------
    
garajeServices.factory('Users', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/userAPI.php/users', {},
					{query: {method:'GET', isArray:true}});
  }]);
  
garajeServices.factory('User', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/userAPI.php/users/:userId', {}, {
      query: {method:'GET', isArray: false},
	  create: {method:'POST',data: '@user'},
      update: {method:'PUT', params: {userId: '@userId'}},
      remove: {method:'DELETE', params: {userId: '@userId'}}
    });
  }]);
  
garajeServices.factory('Auth', ['$resource',
  function($resource){
    return $resource('http://localhost/garaje/api/userAPI.php/login', {}, {
	  authenticate: {method:'POST',data: '@user'},
    });
  }]);

  
 
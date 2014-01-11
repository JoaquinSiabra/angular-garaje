'use strict';

var garajeServices = angular.module('garajeServices', ['ngResource']);
  
garajeServices.factory('Proyectos', ['$resource',
  function($resource){
    return $resource('/garaje/api/proyectoAPI.php/proyectos/:userRol/:userId', {}, {
		query: {method:'GET', isArray:true},
		queryUser: {method:'GET', params: {userRol:'@userRol', userId: '@userId'}, isArray:true}
	});
  }]);
  
garajeServices.factory('Proyecto', ['$resource',
  function($resource){
    return $resource('/garaje/api/proyectoAPI.php/proyecto/:proyectoId', {}, {
      query: {method:'GET', isArray: false},
	  create: {method:'POST',data: '@proyecto'},
      update: {method:'PUT', params: {proyectoId: '@proyectoId'}},
      remove: {method:'DELETE', params: {proyectoId: '@proyectoId'}}
    });
  }]);
  
  garajeServices.factory('Colaborador', ['$resource',
  function($resource){
    return $resource('/garaje/api/proyectoAPI.php/proyecto/:proyectoId/colaborador/:userId/:aceptado', {}, {
	  query: {method:'GET', isArray: false},
	  create: {method:'POST',params: {proyectoId: '@proyectoId', userId:'@userId'}},
      remove: {method:'DELETE', params: {proyectoId: '@proyectoId', userId:'@userId'}},
	  accept: {method:'PUT',params: {proyectoId: '@proyectoId', userId:'@userId', aceptado:'1'}},
	  suspend: {method:'PUT',params: {proyectoId: '@proyectoId', userId:'@userId', aceptado:'0'}}
    });
  }]);
  
  
  garajeServices.factory('Images', ['$resource',
  function($resource){  
    return $resource('/garaje/api/proyectoAPI.php/imagenes/:proyectoId', {},
					{query: {method:'GET', isArray:true}});
  }]);
  
  garajeServices.factory('Image', ['$resource',
  function($resource){
    return $resource('/garaje/api/proyectoAPI.php/imagenes', {}, {
	  create: {method:'POST', data: '@proyecto'},
    });
  }]);
    
  
  //--------------------------------------------
    
garajeServices.factory('Users', ['$resource',
  function($resource){
    return $resource('/garaje/api/userAPI.php/users', {},
					{query: {method:'GET', isArray:true}});
  }]);
  
garajeServices.factory('User', ['$resource',
  function($resource){
    return $resource('/garaje/api/userAPI.php/users/:userId', {}, {
      query: {method:'GET', isArray: false},
	  create: {method:'POST', data: '@user'},
      update: {method:'PUT', params: {userId: '@userId'}},
      remove: {method:'DELETE', params: {userId: '@userId'}}
    });
  }]);
  
garajeServices.factory('Auth', ['$resource',
  function($resource){
    return $resource('/garaje/api/userAPI.php/login', {}, {
	  authenticate: {method:'POST',data: '@user'},
    });
  }]);
  
garajeServices.factory('Sesion', ['$rootScope', 'Auth',
  function($rootScope, Auth) {
		
	function getIdUser() {
		return $rootScope.userSesion.idUser;
	}
	
	function getUser() {
		if ($rootScope.userSesion!=undefined) {
			return $rootScope.userSesion.username;
		}		
		return angular.fromJson(localStorage.getItem('userSesion'));	
	}
	
	function logged() {		
		return ($rootScope.userSesion!==null);	
	}
	
	function loggedUser(username) {	
		if (logged()){
			return ($rootScope.userSesion.username===username);	
		}
		return false;
	}
	
	function logout() {
		localStorage.clear();
		sessionStorage.clear();
		$rootScope.userSesion = null;		
	}
	
	function login(userLogging) {
		Auth.authenticate(userLogging, function(user) {
				localStorage.setItem('userSesion', angular.toJson(user)); 			
				$rootScope.userSesion = angular.fromJson(localStorage.getItem('userSesion'));
		});
	}	
	
	function reload(){
		window.location.reload();
	}	
	
	return {	
		logged: logged,
		loggedUser: loggedUser,
		logout: logout,
		login: login,
		getIdUser: getIdUser,
		getUser: getUser,
		reload: reload
	};
		
}]);  


  
 
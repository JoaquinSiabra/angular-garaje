'use strict';

var garajeControllers = angular.module('garajeControllers', []);
 
garajeControllers.controller('SesionCtrl', ['$rootScope', '$scope','Sesion',
  function($rootScope, $scope, Sesion) {
 
	//Esto hay que mejorarlo
  	$rootScope.userSesion = Sesion.userSesion;
	$rootScope.logged = Sesion.logged;
	$rootScope.logout = Sesion.logout;
	$rootScope.login = Sesion.login;
	
	$scope.userLogging = {username: "", password:""};
	
}]);  

 
garajeControllers.controller('ProyectoListCtrl', ['$rootScope','$scope','Proyectos','Sesion',
  function($rootScope,$scope, Proyectos,Sesion) {
  	
    $scope.proyectos = Proyectos.query();
    $scope.orderProp = 'nombre';
	
}]);  
  
garajeControllers.controller('ProyectoNewCtrl', ['$scope','$routeParams', 'Proyecto','Images','Sesion',
  function($scope, $routeParams, Proyecto, Images, Sesion) {
  
    $scope.proyecto = {};
	$scope.proyecto.idUser= Sesion.getIdUser();
	$scope.images = {};
  
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
			
	$scope.update = function() {
		Proyecto.create($scope.proyecto); 
	}
	
}]);

   
garajeControllers.controller('ProyectoDetailCtrl', ['$scope','$routeParams', 'Proyecto','Images','Image','Sesion','Colaborador',
  function($scope, $routeParams, Proyecto, Images, Image,Sesion,Colaborador) {
  
    $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId}, function(proyecto) {
    });
	
	$scope.images = Images.query({proyectoId: $routeParams.proyectoId}, function(images) {
        $scope.mainImageUrl = images[0].URLImagen;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;	  
    }
	
	$scope.esUsuarioPropietario = function() {
      return ($scope.proyecto.username == Sesion.getUser());	  
    }
	$scope.esUsuarioColaborador = function() {
	  var esta = false;
	  var colaborador;
	  for (colaborador in $scope.proyecto.colaboradores) {
		esta = esta || (colaborador.username == Sesion.getUser());
	  }
      return (esta);	  
    }
	
	$scope.colaborar= function() {
      Colaborador.create({proyectoId: $routeParams.proyectoId, userId: Sesion.getIdUser()}, function (){
			 $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId});
	  }); 
    }	
	$scope.abandonar= function(posicion) {
      Colaborador.remove({proyectoId: $routeParams.proyectoId, userId: Sesion.getIdUser()}, function (){
			$scope.proyecto.colaboradores.splice(posicion,1);
	  }); 
    }	
	
	$scope.update = function() {
		$scope.proyecto.$update({proyectoId: $routeParams.proyectoId}, function(){
			alert("Se ha modificado el proyecto")});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
	$scope.addImage = function() {
		Image.create($scope.proyecto); 
	}	
	
	$scope.deletes = function() {
		Proyecto.remove({proyectoId: $routeParams.proyectoId}); 
	}
			
}]);
  
   
  //==========================================================

garajeControllers.controller('UserListCtrl', ['$rootScope','$scope','Users','Sesion',
  function($rootScope, $scope, Users, Sesion) {  
	
    $scope.users = Users.query();
    $scope.orderProp = 'username';	

}]);    
  
garajeControllers.controller('UserNewCtrl', ['$scope','$routeParams', 'User',
  function($scope, $routeParams, User) {
  
    $scope.user = {};
  
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
			
	$scope.update = function() {
		User.create($scope.user); 
	}
	
}]);

garajeControllers.controller('UserAreaCtrl', ['$rootScope','Sesion',
  function($rootScope, Sesion) {  
  
	
}]);


garajeControllers.controller('UserDetailCtrl', ['$scope', '$rootScope','$routeParams', 'User','Sesion',
  function($scope,$rootScope, $routeParams, User,Sesion) {
  
    $scope.user = User.query({userId: $routeParams.userId}, function(user) {
    });		

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
	
	$scope.esUsuarioPropietario= function() {
      return ($scope.proyecto.username == Sesion.getUser());	  
    }
	
	$scope.update = function() {
		$scope.user.$update({userId: $routeParams.userId},function(){
			alert("Se ha modificado el usuario")});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
	$scope.deletes = function() {
		User.remove({userId: $routeParams.userId}); 
	}
	
}]);
  
  
garajeControllers.controller('UserProyectosCtrl', ['$rootScope','$scope','$routeParams','Proyectos',
  function($rootScope, $scope, $routeParams, Proyectos) {
  	
    $scope.proyectos = Proyectos.queryUser({userRol:'propietario', userId: $routeParams.userId});
    $scope.orderProp = 'nombre';
	
}]); 

garajeControllers.controller('UserColaboracionesCtrl', ['$rootScope','$scope','$routeParams','Proyectos',
  function($rootScope, $scope, $routeParams, Proyectos) {
  	
    $scope.proyectos = Proyectos.queryUser({userRol:'colaborador', userId: $routeParams.userId});
    $scope.orderProp = 'nombre';
	
}]); 
  


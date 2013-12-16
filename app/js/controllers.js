'use strict';

var garajeControllers = angular.module('garajeControllers', ['ngRoute']);
 
garajeControllers.controller('SesionCtrl', ['$rootScope','$scope','Sesion',
  function($rootScope, $scope, Sesion) {
 
	//Esto hay que mejorarlo
  	$rootScope.userSesion = Sesion.getUser();
	$rootScope.logged = Sesion.logged;
	$rootScope.logout = Sesion.logout;
	$rootScope.login = Sesion.login;
	$rootScope.loggedUser = Sesion.loggedUser;
	
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

   
garajeControllers.controller('ProyectoDetailCtrl', ['$scope','$rootScope','$routeParams', 'Proyecto','Images','Image','Sesion','Colaborador',
  function($scope, $rootScope,$routeParams, Proyecto, Images, Image,Sesion,Colaborador) {
  
	$scope.esUsuarioPropietario = false;
  
    $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId}, function(proyecto) {
		$scope.esUsuarioPropietario = ($scope.proyecto.propietario == Sesion.getUser());	
    });
	
	$scope.images = Images.query({proyectoId: $routeParams.proyectoId}, function(images) {
        $scope.mainImageUrl = images[0].URLImagen;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;	  
    }
		
	//$scope.esUsuarioColaborador = Colaborador.query({proyectoId: $routeParams.proyectoId,userId:Sesion.getIdUser()});
	
	$scope.esUsuarioSuspenso = function(colaborador) {
		return colaborador.aceptado==0;
	}
	$scope.esUsuarioLogged = function(colaborador) {
	alert($rootScope.loggedUser(colaborador.username));
		return $rootScope.loggedUser(colaborador.username);
	}
	
	$scope.colaborar= function() {
      Colaborador.create({proyectoId: $routeParams.proyectoId, userId: Sesion.getIdUser()}, function (){
			 $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId});
	  }); 
    }	
	$scope.abandonar= function(posicion) {
		if (confirm("¿Estás seguro?")) {
		  Colaborador.remove({proyectoId: $routeParams.proyectoId, userId: Sesion.getIdUser()}, function (){
				$scope.proyecto.colaboradores.splice(posicion,1);
		  }); 
		}
    }	
	
	$scope.aceptar= function(idUser) {
      Colaborador.accept({proyectoId: $routeParams.proyectoId, userId: idUser}, function (){
			 $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId});
	  }); 
    }	
	
	$scope.suspender= function(idUser) {
      Colaborador.suspend({proyectoId: $routeParams.proyectoId, userId: idUser}, function (){
			 $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId});
	  }); 
    }
	
	$scope.rechazar= function(posicion) {
		if (confirm("¿Estás seguro?")) {
		  Colaborador.remove({proyectoId: $routeParams.proyectoId, userId: $scope.colaborador.idUser}, function (){
				$scope.proyecto.colaboradores.splice(posicion,1);
		  }); 
		}
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
		if (confirm("Se va a borrar el proyecto y toda la información asociada. ¿Continuo?")) {
			Proyecto.remove({proyectoId: $routeParams.proyectoId}); 
		}
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
	
	$scope.esUsuarioCorrecto= function() {
     return ($scope.user.username == Sesion.getUser());	  
    }
	
	$scope.update = function() {
		$scope.user.$update({userId: $routeParams.userId},function(){
			alert("Se ha modificado el usuario")});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
	$scope.deletes = function() {
		if (confirm("Se va a borrar el usuario. ¿Continuo?")) {
			User.remove({userId: $routeParams.userId}); 
		}
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
  


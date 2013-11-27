'use strict';

var garajeControllers = angular.module('garajeControllers', []);

garajeControllers.controller('PrincipalCtrl', ['$scope', '$location','Auth',
  function($scope, $location,  Auth) {

	$scope.userSesion = garajeApp.getUserSesion();
	
	$scope.logged = function() {
			return $scope.userSesion.username !== undefined;	
	};
	$scope.logout = function() {
			garajeApp.removeUserSesion();
			$scope.userSesion = garajeApp.getUserSesion();	
	};
	$scope.login = function() {
			Auth.authenticate($scope.userLogging, function(user) {
			garajeApp.setUserSesion(user);		
			$scope.userSesion = garajeApp.getUserSesion();			
		});
	}	
}]);  

garajeControllers.controller('ProyectoListCtrl', ['$scope', '$location','Proyectos',
  function($scope, $location, Proyectos, Login) {
    $scope.proyectos = Proyectos.query();
	$scope.userSesion = garajeApp.getUserSesion();
    $scope.orderProp = 'nombre';
	
	//REPETIDA, esta en PrincipatCtrl
	$scope.logged = function() {
			return $scope.userSesion.username !== undefined;	
	};
		
}]);  
  
garajeControllers.controller('ProyectoNewCtrl', ['$scope', '$location','$routeParams', 'Proyecto','Images',
  function($scope, $location, $routeParams, Proyecto, Images) {
  
    $scope.proyecto = {};
	$scope.images = {};
  
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
			
	$scope.update = function() {
		Proyecto.create($scope.proyecto); 
	}
	
	/*$scope.goNext = function (hash) { 
		$location.path(hash);
	}*/
	
}]);

   
garajeControllers.controller('ProyectoDetailCtrl', ['$scope', '$location','$routeParams', 'Proyecto','Images','Image',
  function($scope, $location, $routeParams, Proyecto, Images, Image) {
  
    $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId}, function(proyecto) {
    });
	
	$scope.images = Images.query({proyectoId: $routeParams.proyectoId}, function(images) {
        $scope.mainImageUrl = images[0].URLImagen;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;	  
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
  
garajeControllers.controller('UserListCtrl', ['$scope', '$location', 'Users',
  function($scope, $location, Users, Login) {
    $scope.users = Users.query();
	$scope.userSesion = garajeApp.getUserSesion();
    $scope.orderProp = 'username';
}]);    
  
garajeControllers.controller('UserNewCtrl', ['$scope', '$location','$routeParams', 'User',
  function($scope, $location, $routeParams, User) {
  
    $scope.user = {};
  
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
			
	$scope.update = function() {
		User.create($scope.user); 
	}
}]);

garajeControllers.controller('UserDetailCtrl', ['$scope', '$location','$routeParams', 'User',
  function($scope, $location, $routeParams, User) {
  
    $scope.user = User.query({userId: $routeParams.userId}, function(user) {
    });	

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
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
  
  


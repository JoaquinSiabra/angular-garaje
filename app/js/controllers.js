'use strict';

/* Controllers */

var garajeControllers = angular.module('garajeControllers', []);

garajeControllers.controller('ProyectoListCtrl', ['$scope', 'Proyectos',
  function($scope, Proyectos, $http) {
    $scope.proyectos = Proyectos.query();
    $scope.orderProp = 'age';

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
	$scope.goNext = function (hash) { 
		$location.path(hash);
	}
	
  }]);

   
garajeControllers.controller('ProyectoDetailCtrl', ['$scope', '$location','$routeParams', 'Proyecto','Images','Image',
  function($scope, $location, $routeParams, Proyecto, Images, Image) {
  
    $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId}, function(proyecto) {
    });
	$scope.images = Images.query({proyectoId: $routeParams.proyectoId}, function(images) {
        $scope.mainImageUrl = images[0].imageURL;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
	
	$scope.update = function() {
		$scope.proyecto.$update({proyectoId: $routeParams.proyectoId});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
	$scope.addImage = function() {
		Image.create($scope.proyecto); 
	}	
	
	$scope.deletes = function() {
		Proyecto.remove({proyectoId: $routeParams.proyectoId}); 
	}
	$scope.goNext = function (hash) { 
		$location.path(hash);
	}
	
  }]);
  
   
  garajeControllers.controller('ProyectoListCtrl', ['$scope', 'Proyectos',
  function($scope, Proyectos, $http) {
    $scope.proyectos = Proyectos.query();
    $scope.orderProp = 'age';

}]);
  
  
   
  //==========================================================
  
  
  garajeControllers.controller('UserListCtrl', ['$scope', 'Users',
  function($scope, Users, $http) {
    $scope.users = Users.query();
    $scope.orderProp = 'age';

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
	$scope.goNext = function (hash) { 
		$location.path(hash);
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
		$scope.user.$update({userId: $routeParams.userId});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
	$scope.deletes = function() {
		User.remove({userId: $routeParams.userId}); 
	}
	$scope.goNext = function (hash) { 
		$location.path(hash);
	}
	
  }]);

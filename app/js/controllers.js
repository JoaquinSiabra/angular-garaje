'use strict';

/* Controllers */

var garajeControllers = angular.module('garajeControllers', []);

garajeControllers.controller('ProyectoListCtrl', ['$scope', 'Proyectos',
  function($scope, Proyectos, $http) {
    $scope.proyectos = Proyectos.query();
    $scope.orderProp = 'age';
  }]);

garajeControllers.controller('ProyectoDetailCtrl', ['$scope', '$location','$routeParams', 'Proyecto','Images',
  function($scope, $location, $routeParams, Proyecto, Images) {
  
    $scope.proyecto = Proyecto.query({proyectoId: $routeParams.proyectoId}, function(proyecto) {
      //$scope.mainImageUrl = phone.images[0];
    });
	$scope.images = Images.query({proyectoId: $routeParams.proyectoId}, function(images) {
        $scope.mainImageUrl = images[0].imageURL;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
	
	$scope.update = function() {
		//console.log($scope.proyecto);
		$scope.proyecto.$update({proyectoId: $routeParams.proyectoId});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
	$scope.delete = function() {
		//console.log($scope.proyecto);
		//$scope.proyecto.$update({proyectoId: $routeParams.proyectoId});
		Proyecto.remove({proyectoId: $routeParams.proyectoId}); 
	}
	$scope.goNext = function (hash) { 
		$location.path(hash);
	}
	
  }]);

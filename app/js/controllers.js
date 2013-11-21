'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Proyectos',
  function($scope, Proyectos, $http) {
    $scope.proyectos = Proyectos.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Proyecto','Images',
  function($scope, $routeParams, Proyecto, Images) {
    $scope.proyecto = Proyecto.get({proyectoId: $routeParams.proyectoId}, function(proyecto) {
      //$scope.mainImageUrl = phone.images[0];
    });
	 $scope.images = Images.query({proyectoId: $routeParams.proyectoId}, function(images) {
        $scope.mainImageUrl = images[0].imageURL;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
	
	$scope.update = function() {
		console.log($scope.proyecto);
		$scope.proyecto.$update({proyectoId: $routeParams.proyectoId});
		//Proyecto.update({proyectoId: $routeParams.proyectoId}); 
	}
	
  }]);

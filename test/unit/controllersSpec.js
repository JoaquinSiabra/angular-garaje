'use strict';

/* jasmine specs for controllers go here */

describe('Controllers de Proyectos', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
  beforeEach(module('garajeApp'));
  beforeEach(module('garajeServices'));

  
  describe('ProyectoListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      //Llamadas que el controlador debería hacer al servicio
	  $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost/garaje/api/index.php/proyectos').
          respond([{nombre: 'Proyecto1'}, {nombre: 'Proyecto2'}]);

	  //Configuracion del controlador
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoListCtrl', {$scope: scope});
    }));


    it('should get a list with 2 proyectos fetched from xhr', function() {
      expect(scope.proyectos).toEqualData([]);
      $httpBackend.flush();

      expect(scope.proyectos).toEqualData(
          [{nombre: 'Proyecto1'}, {nombre: 'Proyecto2'}]);
    });

    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
	
  });


  describe('ProyectoDetailCtrl', function(){
  
    var scope, $httpBackend, ctrl,
        unProyecto = function() {
           return { }
        },
		unasImagenesDelProyecto = function() {
           return [{imageURL:'primeraInagen.jpg'},{imageURL:'segundaImagen.jpg'}]
        };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost/garaje/api/index.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/index.php/imagenes/1').respond(unasImagenesDelProyecto());

	  //Configuracion del controlador
      $routeParams.proyectoId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoDetailCtrl', {$scope: scope});
    }));

    it('should fetch proyect detail', function() {
      expect(scope.proyecto).toEqualData({});
      $httpBackend.flush();

      expect(scope.proyecto).toEqualData(unProyecto());
	  expect(scope.mainImageUrl).toEqualData('primeraInagen.jpg');
    });
	
  });
  
  describe('ProyectoDetailCtrl_UpdateProyecto', function(){
  
    var scope, $httpBackend, ctrl,
        unProyecto = function() {
           return { nombre: 'Nombre', 
					$update: function() {return ''}
				  }
        },
		proyectoModificado = function() {
           return {nombre:'NombreModificado',
					$update: function() {return ''}
				  }
        }, 
		unasImagenesDelProyecto = function() {
           return [{imageURL:'primeraInagen.jpg'},{imageURL:'segundaImagen.jpg'}]
        };
	
		
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  $httpBackend.expectGET('http://localhost/garaje/api/index.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/index.php/imagenes/1').respond(unasImagenesDelProyecto());
	  //$httpBackend.expectPUT('http://localhost/garaje/api/index.php/proyectos/1');
	
	
	  //Configuracion del controlador
      $routeParams.proyectoId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoDetailCtrl', {$scope: scope});
    }));

    it('should modify proyect detail', function() { 
      expect(scope.proyecto).toEqualData({});
      $httpBackend.flush();
	  
	  spyOn(unProyecto, '$update').andCallThrough();
	 
	  scope.proyecto.nombre = 'NombreModificado';
	  scope.update();
     	
      expect(scope.proyecto).toEqualData(proyectoModificado());
	  expect(unProyecto.$update).toHaveBeenCalled();  
    });
	
  });
  
  
});

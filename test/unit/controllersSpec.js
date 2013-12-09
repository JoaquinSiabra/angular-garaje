'use strict';

/* jasmine specs for controllers go here */


describe('Controllers de Users', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
  beforeEach(module('garajeApp'));
  beforeEach(module('garajeServices'));

    
  //-----------------------------------------------------------------------
  describe('UsuarioListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      //Llamadas que el controlador debería hacer al servicio
	  $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost/garaje/api/userAPI.php/users').
          respond([{nombre: 'user1'}, {nombre: 'user2'}]);

	  //Configuracion del controlador
      scope = $rootScope.$new();
      ctrl = $controller('UserListCtrl', {$scope: scope});
    }));


    it('should get a list with 2 users fetched from xhr', function() {
      expect(scope.users).toEqualData([]);
      $httpBackend.flush();

      expect(scope.users).toEqualData(
          [{nombre: 'user1'}, {nombre: 'user2'}]);
    });

    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('username');
    });
	
  });
  
   //-----------------------------------------------------------------
  describe('ProyectoDetailCtrl_AddImage', function(){
  
    var scope, $httpBackend, ctrl,
        unProyecto = function() {
           return {nombre: 'Nombre'}
        },
		proyectoModificado = function() {
           return {nombre: 'NombreModificado'}
        }, 
		unasImagenesDelProyecto = function() {
           return [{imageURL:'primeraInagen.jpg'},{imageURL:'segundaImagen.jpg'}]
        };
	
		
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/imagenes/1').respond(unasImagenesDelProyecto());
	 
	  //Configuracion del controlador
      $routeParams.proyectoId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoDetailCtrl', {$scope: scope});
    }));

    it('should modify add image to project', function() { 
      expect(scope.proyecto).toEqualData({}); 	  
	  $httpBackend.flush();  
	  
	  expect(scope.proyecto).toEqualData(unProyecto()); 	  
	  
	  $httpBackend.expectPOST('http://localhost/garaje/api/proyectoAPI.php/imagenes').respond({});
	  scope.addImage();
      $httpBackend.flush();	  
      
    });
	
  });
  
  //-----------------------------------------------------------------
  describe('UserNewCtrl_Create', function(){
  
    var scope, $httpBackend, ctrl;	
		
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  		
	  //Configuracion del controlador
      scope = $rootScope.$new();
      ctrl = $controller('UserNewCtrl', {$scope: scope});
    }));

    it('should create a new user', function() { 
  	  
	  $httpBackend.expectPOST('http://localhost/garaje/api/userAPI.php/users').respond({});
	  scope.update();
      $httpBackend.flush();	  
      
    });
	
  }); 
  
  
   //-----------------------------------------------------------------
  describe('UserDetailCtrl_UpdateUser', function(){
  
    var scope, $httpBackend, ctrl,
        unUser = function() {
           return {nombre: 'Nombre'}
        };
			
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  $httpBackend.expectGET('http://localhost/garaje/api/userAPI.php/users/1').respond(unUser());
	 
	  //Configuracion del controlador
      $routeParams.userId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('UserDetailCtrl', {$scope: scope});
    }));

    it('should modify user detail', function() { 
      expect(scope.user).toEqualData({}); 	  
	  $httpBackend.flush();  
	  
	  expect(scope.user).toEqualData(unUser()); 	  
	  scope.user.nombre = 'NombreModificado';
	  
	  $httpBackend.expectPUT('http://localhost/garaje/api/userAPI.php/users/1').respond({});
	  scope.update();
      $httpBackend.flush();	  
      
    });
	
  });
  
   //-------------------------------------------------------------------------------
  describe('UserDetailCtrl_DeleteUser', function(){
  
    var scope, $httpBackend, ctrl,
        unUser = function() {
           return { nombre: 'Nombre'}
        },
		userModificado = function() {
           return {nombre:'NombreModificado'}
        };	
		
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  $httpBackend.expectGET('http://localhost/garaje/api/userAPI.php/users/1').respond(unUser());
	  $httpBackend.expectDELETE('http://localhost/garaje/api/userAPI.php/users/1').respond({});
	 	
	  //Configuracion del controlador
      $routeParams.userId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('UserDetailCtrl', {$scope: scope});
    }));

    it('should remove user detail', function() { 
      expect(scope.user).toEqualData({});
	   
	  scope.deletes();
	  $httpBackend.flush();
    });
	
  });    
  
  
  //-----------------------------------------------------------------------
  describe('ProyectoListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      //Llamadas que el controlador debería hacer al servicio
	  $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos').
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
      expect(scope.orderProp).toBe('nombre');
    });
	
  });

//---------------------------------------------------------------------------------
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
      $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/imagenes/1').respond(unasImagenesDelProyecto());

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
  
});



//===============================================================


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

  //-----------------------------------------------------------------
  describe('ProyectoNewCtrl_CreateProyecto', function(){
  
    var scope, $httpBackend, ctrl,
        unProyecto = function() {
           return {nombre: 'Nombre'}
        },
		unasImagenesDelProyecto = function() {
           return [{imageURL:'primeraInagen.jpg'},{imageURL:'segundaImagen.jpg'}]
        };	
		
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  		
	  //Configuracion del controlador
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoNewCtrl', {$scope: scope});
    }));

    it('should create a new proyect', function() { 
  	  
	  scope.proyecto = unProyecto();
	  
	  $httpBackend.expectPOST('http://localhost/garaje/api/proyectoAPI.php/proyectos').respond({});
	  scope.update();
      $httpBackend.flush();	  
      
    });
	
  }); 
  
  
   //-----------------------------------------------------------------
  describe('ProyectoDetailCtrl_UpdateProyecto', function(){
  
    var scope, $httpBackend, ctrl,
        unProyecto = function() {
           return {nombre: 'Nombre'}
        },
		proyectoModificado = function() {
           return {nombre: 'NombreModificado'}
        }, 
		unasImagenesDelProyecto = function() {
           return [{imageURL:'primeraInagen.jpg'},{imageURL:'segundaImagen.jpg'}]
        };
	
		
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      //Llamadas que el controlador debería hacer al servicio
 	  $httpBackend = _$httpBackend_;
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/imagenes/1').respond(unasImagenesDelProyecto());
	 
	  //Configuracion del controlador
      $routeParams.proyectoId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoDetailCtrl', {$scope: scope});
    }));

    it('should modify proyect detail', function() { 
      expect(scope.proyecto).toEqualData({}); 	  
	  $httpBackend.flush();  
	  
	  expect(scope.proyecto).toEqualData(unProyecto()); 	  
	  scope.proyecto.nombre = 'NombreModificado';
	  
	  $httpBackend.expectPUT('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond({});
	  scope.update();
      $httpBackend.flush();	  
      
    });
	
  });
  
   //-------------------------------------------------------------------------------
  describe('ProyectoDetailCtrl_DeleteProyecto', function(){
  
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
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/imagenes/1').respond(unasImagenesDelProyecto());
	  $httpBackend.expectDELETE('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond({});
	 
	
	  //Configuracion del controlador
      $routeParams.proyectoId = '1';
      scope = $rootScope.$new();
      ctrl = $controller('ProyectoDetailCtrl', {$scope: scope});
    }));

    it('should remove proyect detail', function() { 
      expect(scope.proyecto).toEqualData({});
	   
	  scope.deletes();
	  $httpBackend.flush();
    });
	
  });  
  
  
  
  //-----------------------------------------------------------------------
  describe('ProyectoListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      //Llamadas que el controlador debería hacer al servicio
	  $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos').
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
      expect(scope.orderProp).toBe('nombre');
    });
	
  });

//---------------------------------------------------------------------------------
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
      $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/proyectos/1').respond(unProyecto());
	  $httpBackend.expectGET('http://localhost/garaje/api/proyectoAPI.php/imagenes/1').respond(unasImagenesDelProyecto());

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
  
});


describe('Sesion', function(){
});



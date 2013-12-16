'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Garaje App', function() {

	function login(){
	  browser().navigateTo('../../app/#/login');
	  input('userLogging.username').enter('anfilbiblio');
	  input('userLogging.password').enter('redherme');
	  element('#login').click();
	};
	function logout(){
	  element('#logout').click();
	};
	function signup(){
	  element('#signup').click();
	};


  it('debería redireccionarse index.html a index.html#/portada', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/portada');
  });


  describe('Pagina portada', function() {
	
    beforeEach(function() {
      browser().navigateTo('../../app/#/portada');
    });
	
	afterEach(function() {
      browser().navigateTo('../../app/#/portada');
	  logout();
    });

	
    it('debería redireccionarse de login a user area (si login correcto)', function() {
		login();
		expect(browser().location().url()).toBe('/users/area');
    });
	
    it('debería mostrar en la portada el boton de Login (y no el de Logout) si no se ha hecho Login', function() {
	  expect(element('#logout').css("display")).toBe("none");
	  expect(element('#login').css("display")).not().toBe("none");
    });

    it('debería mostrar en la portada el boton de Logout (y no el de Login) si se ha hecho Login', function() {
   	  login();
	  browser().navigateTo('../../app/#/portada');
	  expect(element('#logout').css("display")).not().toBe("none");
	  expect(element('#login').css("display")).toBe("none");
    });
	
	it('debería no mostrar el boton de SignUp si se ha hecho LogIn', function() {
	  browser().navigateTo('../../app/#/login')
   	  login();	  
	  browser().navigateTo('../../app/#/login');
	  expect(element('#signup').css("display")).toBe("none");	  
    });
	
	it('debería mostrar el boton de SignUp si se no se ha hecho LogIn', function() {
	  browser().navigateTo('../../app/#/login')
      expect(element('#signup').css("display")).not().toBe("none");	
    });

	it('debería mostrar el username si se ha hecho LogIn', function() {
	  browser().navigateTo('../../app/#/login')
   	  login();	  
	  expect(element('#username')).toHaveText('anfilbiblio');	  	 
    });
	
	it('debería no mostrar el username si no se ha hecho LogIn', function() {
	  expect(element('#userLoggedLink').attr('href')).toBe('#/users/');	  	 
    });
	
	it('debería no mostrar ningun username si se ha hecho LogOut', function() {
	  browser().navigateTo('../../app/#/login');
   	  login();
	  logout();
	  expect(element('#userLoggedLink').attr('href')).toBe('#/users/');	  	 	  
    });
	
	it('debería poder crearse un nuevo usuario si se pulsa SignUp', function() {
	  browser().navigateTo('../../app/#/login');
	  signup();
	  expect(browser().location().url()).toBe('/users/new'); 	 	  
    });

  });  
  
  
  
  
  describe('Vista de los proyectos', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/#/proyectos');
    });


    it('debería filtar la lista de proyectos cuando el usuario escribe en la caja de busqueda', function() {

      input('query').enter('pro');
      expect(repeater('.phones li').count()).toBe(3);

      input('query').enter('proyecto1');
      expect(repeater('.phones li').count()).toBe(1);
	  
	  input('query').enter('saturnia');
	  expect(repeater('.phones li').count()).toBe(0);
    });


    it('debería poder ordenarse la lista mediante el desplegable de orden', function() {
      input('query').enter('pro'); 
	  
	  select('orderProp').option('nombre');	  
      expect(repeater('.phones li', 'Phone List').column('proyecto.nombre')).
          toEqual(["proyecto1","proyecto2","proyecto3"]);

      select('orderProp').option('fechaAlta');
      expect(repeater('.phones li', 'Phone List').column('proyecto.nombre')).
          toEqual(["proyecto3","proyecto2","proyecto1"]);		 
    });


    it('debería renderizar los links específicos de los proyectos', function() {
      input('query').enter('proyecto1');
      element('.phones li a').click();
      expect(browser().location().url()).toBe('/proyectos/1');
    });
	
	it('debería no mostrar el boton de creacion de proyectos si no se ha hecho login', function() {
		expect(element('#newProject').css("display")).toBe("none");      
    });
	
	it('debería mostrar el boton de creacion de proyectos si se ha hecho login', function() {
		login();
		browser().navigateTo('../../app/#/proyectos');
		expect(element('#newProject').css("display")).not().toBe("none"); 	
    });	

  });


  describe('Vista de detalle del proyecto', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/#/proyectos/1');
    });


    it('debería mostrar la página del proyecto1', function() {
      expect(binding('proyecto.nombre')).toBe('proyecto1');
    });


    it('deberia mostrar la primera imagen como la principal', function() {
      expect(element('img.phone').attr('src')).toBe('img/proyectos/dell-streak-7.0.jpg');
    });


    it('debería cambiar la imagen principal si se pulsa sobre una miniatura', function() {
      element('.phone-thumbs li:nth-child(3) img').click();
      expect(element('img.phone').attr('src')).toBe('img/proyectos/dell-streak-7.2.jpg');

      element('.phone-thumbs li:nth-child(1) img').click();
      expect(element('img.phone').attr('src')).toBe('img/proyectos/dell-streak-7.0.jpg');
    });
  });
  
  
  
  
  describe('Vista de los usuarios', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/#/users');
    });


    it('debería filtar la lista de users cuando el usuario escribe en la caja de busqueda', function() {
      
      expect(repeater('.phones li').count()).toBe(4);

      input('query').enter('anfilbiblio');
      expect(repeater('.phones li').count()).toBe(1);
	  
	  input('query').enter('saturnia');
	  expect(repeater('.phones li').count()).toBe(0);
	  
    });


    it('debería poder ordenarse la lista mediante el desplegable de orden', function() {
	  
	  select('orderProp').option('username');	  
      expect(repeater('.phones li', 'User List').column('user.username')).
        toEqual(["amalcio","anfilbiblio","dd","usu"]);

      select('orderProp').option('apellidos');
      expect(repeater('.phones li', 'User List').column('user.username')).
        toEqual(["dd","usu","anfilbiblio","amalcio"]);
    });

   
  });


  describe('Vista de detalle del usuario', function() {

    beforeEach(function() {
   	  login();
    });

    it('debería mostrar la página del user habiendo hecho login', function() {
	  browser().navigateTo('../../app/#/users/1');
      expect(binding('user.username')).toBe('anfilbiblio');
    });

    it('debería no mostrar la página del user si no hemos hecho login', function() {
	  logout();
	  browser().navigateTo('../../app/#/users/1');
      expect(binding('user.username')).not().toBe('anfilbiblio');
    });


  });  
  
  
});
